import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Matricula} from '../modelos/matricula.model';
import {Carrera} from '../modelos/carrera.model';
import {Router} from '@angular/router';
import {Participante} from '../modelos/participante.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {DetalleMatricula} from '../modelos/detalle-matricula.model';
import {Curso} from '../modelos/curso.model';
import {TipoMatricula} from '../modelos/tipo-matricula.model';
import swal from 'sweetalert2';
import {environment} from '../../../../environments/environment';
import {Notificacion} from '../modelos/notificacion.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {User} from '../modelos/user.model';
import { TipoDescuento } from '../modelos/tipo-descuento.model';

@Component({
  selector: 'app-cupo',
  templateUrl: './cupo.component.html',
  styleUrls: ['./cupo.component.scss']
})
export class CupoComponent implements OnInit {
  tipoDescuento: Array<TipoDescuento>;
  notificacion: Notificacion;
  erroresCargaCupos: Array<any>;
  urlExportCuposPeriodoAcademico: string;
  urlExportCuposCarrera: string;
  buscador: string;
  archivo: any;
  archivoTemp: any;
  flagAsignaturasCupo: boolean;
  cupos: Array<Matricula>;
  detalleMatricula: Array<DetalleMatricula>;
  detalleMatriculaNuevo: DetalleMatricula;
  participantes: Array<Participante>;
  cursos: Curso; 
  tiposMatricula: Array<TipoMatricula>; 
  paralelos: Array<any>;
  numerosMatricula: Array<any>;
  actual_page: number;
  records_per_page: number;
  total_pages: number;
  total_register: number;
  total_pages_pagination: Array<any>;
  total_pages_temp: number;
  total_detalle_matriculas_en_proceso: number;
  total_detalle_matriculas_matriculados: number;
  total_detalle_matriculas_aprobados: number;
  flagPagination: boolean;
  messages: any;
  matriculaSeleccionada: Matricula;
  carrera: Carrera;
  periodoAcademico: string;
  periodoLectivo: string;
  matriculados: Array<any>;
  matriculas: Array<Matricula>;
  carreras: Array<Carrera>;
  rutaActual: string;
  user: User;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private router: Router, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.buscador = '';
    this.notificacion = new Notificacion();
    this.erroresCargaCupos = new Array<any>();
    this.flagPagination = true;
    this.total_pages_pagination = new Array<any>();
    this.total_pages_temp = 10;
    this.records_per_page = 6;
    this.actual_page = 1;
    this.total_pages = 1;  
    this.flagAsignaturasCupo = false;
    this.rutaActual = this.router.url;
    this.matriculaSeleccionada = new Matricula();   
    this.matriculas = new Array<Matricula>();
    this.detalleMatriculaNuevo = new DetalleMatricula();
    this.carrera = new Carrera();
    this.cursos = new Curso();
    this.tipoDescuento = new Array<TipoDescuento>();   
    this.periodoAcademico = '';
    this.periodoLectivo = '';
   
    this.getCarreras();
    this.getCursos();

  }

  createDetalleMatricula() {
    this.spinner.show();
    this.detalleMatriculaNuevo.estado = 'EN_PROCESO';
    this.service.post('detalle_matriculas', {'detalle_matricula': this.detalleMatriculaNuevo}).subscribe(
      response => {
        this.getDetalleMatricula(this.matriculaSeleccionada);
        this.spinner.hide();
        swal.fire(this.messages['createSuccess']);
        this.detalleMatriculaNuevo = new DetalleMatricula();
      },
      error => {
        this.spinner.hide();
        if (error.error.errorInfo[0] === '23505') {
          swal.fire(this.messages['error23505']);
        } else {
          swal.fire(this.messages['error500']);
        }
      });
  }

  cambiarEstadoFlagAsignaturasCupo() {
    this.flagAsignaturasCupo = false;
    if (this.buscador.trim() === '') {
      this.getCupos(1);
    } else {
      this.getCupo();
    }
  }

  crearNumerosPaginacion() {
    if (this.total_pages > 10) {
      for (let i = 0; i < 10; i++) {
        this.total_pages_pagination[i] = i + this.total_pages_temp - 9;
      }
    } else {
      this.total_pages_pagination = new Array<any>();
      for (let i = 0; i < this.total_pages; i++) {
        this.total_pages_pagination[i] = i + 1;
      }
    }

  }

  deleteDetalleCupo(detalleMatricula: DetalleMatricula) {
    swal.fire(this.messages['deleteQuestion'])
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.delete('matriculas/delete_detalle_cupo?id=' + detalleMatricula.id).subscribe(
            response => {
              this.getDetalleMatricula(this.matriculaSeleccionada);
              this.spinner.hide();
              swal.fire(this.messages['deleteSuccess']);
            },
            error => {
              this.spinner.hide();
              swal.fire(this.messages['error500']);
            });
        }
      });
  }

  deleteCupo(matricula: Matricula) {
    swal.fire(this.messages['deleteQuestion'])
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.delete('matriculas/cupo?id=' + matricula.id).subscribe(
            response => {
              this.getCupos(this.actual_page);
              this.spinner.hide();
              swal.fire(this.messages['deleteSuccess']);
            },
            error => {
              this.spinner.hide();
              swal.fire(this.messages['error500']);
            });
        }
      });
  }

  getAsignaturasCarrera() {
    this.service.get('matriculas/asignaturas?carrera_id=' + this.carrera.id).subscribe(
      response => {
        this.cursos = response['asignaturas'];
      },
      error => {
        this.spinner.hide();
        swal.fire(this.messages['error500']);
      });
  }

  getCarreras() {
    this.spinner.show();
    this.service.get('carreras?user_id=' + this.user.id).subscribe(
      response => {
        this.carreras = response['carreras'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getTipoDescuentos() {
    this.spinner.show();
    this.service.get('tipo_descuentos?user_id=' + this.user.id).subscribe(
      response => {
        this.carreras = response['tipo_descuentos'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getCursos() {
    this.spinner.show();
    this.service.get('cursos?user_id=' + this.user.id).subscribe(
      response => {
        this.cursos = response['cursos'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getParticipantes() {
    this.spinner.show();
    this.service.get('participantes?user_id=' + this.user.id).subscribe(
      response => {
        this.participantes = response['participantes'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  /* getParticipantes() {
    this.spinner.show();
    this.service.get('participantes/get_one?user_id=' + this.user.id).subscribe(
      response => {
        this.participantes = response['participante'];              
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
     });
  } */

  

  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getCupos(1);
      } else {
        this.flagPagination = false;
        this.getCupo();
      }
    }
  }

  getCupo() {
    this.total_pages = 1;
    this.crearNumerosPaginacion();
    this.buscador = this.buscador.toUpperCase();
    const parametros =
      '?identificacion=' + this.buscador
      + '&apellido1=' + this.buscador
      + '&apellido2=' + this.buscador
      + '&nombre1=' + this.buscador
      + '&nombre2=' + this.buscador
      + '&carrera_id=' + this.carrera.id;
    this.spinner.show();
    this.service.get('matriculas/cupo' + parametros).subscribe(
      response => {
        this.cupos = response['cupo'];
        this.spinner.hide();
        this.total_register = this.cupos.length;
      },
      error => {
        this.spinner.hide();
        swal.fire(this.messages['error500']);
      });
  }

  getCupos(page: number) {
    this.flagPagination = true;
    this.buscador = '';
    this.spinner.show();
    this.getDetalleMatriculasForMalla();
    this.urlExportCuposPeriodoAcademico = environment.API_URL + 'exports/cupos_periodo_academico?carrera_id=' + this.carrera.id
      + '&periodo_academico_id=' + this.periodoAcademico;
    this.urlExportCuposCarrera = environment.API_URL + 'exports/cupos_carrera?carrera_id=' + this.carrera.id;
    this.actual_page = page;
    const parametros = '?carrera_id=' + this.carrera.id + '&periodo_lectivo_id=' + /* this.periodoLectivoActual.id + */
      '&periodo_academico_id=' + this.periodoAcademico + '&records_per_page=' + this.records_per_page + '&page=' + page;
    this.service.get('matriculas/cupos' + parametros).subscribe(
      response => {
        this.cupos = response['cupos']['data'];
        this.total_pages = response['pagination']['last_page'];
        this.total_register = response['pagination']['total'];
        this.crearNumerosPaginacion();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getDetalleMatricula(matricula: Matricula) {
    this.spinner.show();
    this.detalleMatricula = null;
    this.flagAsignaturasCupo = true;
    this.matriculaSeleccionada = matricula;
    this.getAsignaturasCarrera();
    this.getTiposMatricula();
    this.service.get('detalle_matriculas?id=' + matricula.id).subscribe(
      response => {
        this.spinner.hide();
        this.detalleMatricula = response['detalle_matricula'];
      },
      error => {
        this.spinner.hide();
        swal.fire(this.messages['error500']);
      });
  }

  getDetalleMatriculasForMalla() {
    const parametros =
      '?carrera_id=' + this.carrera.id
      + '&periodo_lectivo_id=' /* + this.periodoLectivoActual.id */
      + '&periodo_academico_id=' + this.periodoAcademico;
    this.service.get('detalle_matriculas/count' + parametros)
      .subscribe(
        response => {
          this.total_detalle_matriculas_en_proceso = response['en_proceso_count'];
          this.total_detalle_matriculas_aprobados = response['aprobados_count'];
          this.total_detalle_matriculas_matriculados = response['matriculados_count'];
        },
        error => {
        });
  }

  /* getPeriodoAcademicos() {

    this.service.get('catalogos/periodo_academicos').subscribe(
      response => {
       this.peridoAcademicos = response['periodo_academicos'];
      },
      error => {
        this.spinner.hide();
      });
  }
 */
  /* getPeriodoLectivoActual() {
    this.service.get('periodo_lectivos/actual').subscribe(
      response => {
       this.periodoLectivoActual = response['periodo_lectivo_actual'];
      },
      error => {

      });
  }
 */
  /* getPeriodoLectivos() {
    this.service.get('periodo_lectivos').subscribe(
      response => {
        this.periodoLectivos = response['periodo_lectivos']; 
      },
      error => {
        this.spinner.hide();
      });
  } */

  getTiposMatricula() {
    this.service.get('tipo_matriculas').subscribe(
      response => {
        this.tiposMatricula = response['tipo_matriculas'];
      },
      error => {
        this.spinner.hide();
      });
  }

  openDetalleMatricula(content) {
    this.detalleMatriculaNuevo.matricula.id = this.matriculaSeleccionada.id;
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          this.createDetalleMatricula();
        }
      }), (resultCancel => {

      }));
  }

  firstPagina() {
    this.getCupos(1);
    this.total_pages_temp = 10;
    this.crearNumerosPaginacion();
  }

  lastPagina() {
    this.getCupos(this.total_pages);
    this.total_pages_temp = this.total_pages;
    this.crearNumerosPaginacion();
  }

  paginacion(siguiente: boolean) {
    if (siguiente) {
      if (this.actual_page === this.total_pages) {
        return;
      } else {
        if (this.total_pages_temp !== this.total_pages) {
          this.total_pages_temp++;
          this.crearNumerosPaginacion();
        }

        this.actual_page++;
      }
    } else {
      if (this.actual_page === 1) {
        return;
      } else {
        this.actual_page--;
        this.total_pages_temp--;
        this.crearNumerosPaginacion();
      }
    }
    this.getCupos(this.actual_page);
  }

  updateMatricula(matricula: Matricula) {
    this.spinner.show();
    this.service.update('matriculas', {'matricula': matricula})
      .subscribe(
        response => {
          if (this.buscador === '') {
            this.getCupos(this.actual_page);
          } else {
            this.getCupo();
          }

          this.spinner.hide();
          swal.fire(this.messages['updateSuccess']);
        },
        error => {
          this.spinner.hide();
          swal.fire(this.messages['error500']);
        });
  }

  uploadCupos(ev) {
    if (this.periodoAcademico) {
      this.spinner.show();
      this.archivo = ev.target;
      if (this.archivo.files.length > 0) {
        const form = new FormData();
        form.append('archivo', this.archivo.files[0]);
        this.service.upload('imports/cupos?carrera_id=' + this.carrera.id, form).subscribe(
          response => {
            this.getCupos(1);
            this.spinner.hide();
            swal.fire('CARCA DE CUPOS',
              '<li>' + ' Cupos Nuevos: ' + response['total_cupos_nuevos'] + '</li>' +
              '<li>' + ' Cupos Modificados: ' + response['total_cupos_modificados'] + '</li>');
            this.archivoTemp = '';
            this.exportErroresCargaCupos(response['errores']);
            this.sendEmailNotificacionCargaCupos();
          },
          error => {
            this.spinner.hide();
            this.archivoTemp = '';
            swal.fire(this.messages['uploadError']);
          }
        );
      }
    } else {
      this.archivoTemp = '';
      swal.fire('Seleccione un periodo', '', 'warning');
    }
  }

  uploadMatriculas(ev) {
    this.spinner.show();
    this.archivo = ev.target;
    if (this.archivo.files.length > 0) {
      const form = new FormData();
      form.append('archivo', this.archivo.files[0]);
      this.service.upload('imports/matriculas', form).subscribe(
        response => {
          this.getCupos(1);
          this.spinner.hide();

        },
        error => {
          this.spinner.hide();
          alert('Error al subir el archivo');

        }
      );
    }
  }

  updateDetalleMatricula(detalleMatricula: DetalleMatricula) {
    this.spinner.show();
    this.service.update('detalle_matriculas', {'detalle_matricula': detalleMatricula})
      .subscribe(
        response => {
          this.getDetalleMatricula(this.matriculaSeleccionada);
          this.spinner.hide();
          swal.fire(this.messages['updateSuccess']);
        },
        error => {
          this.spinner.hide();
          if (error.error.errorInfo[0] === '23505') {
            swal.fire(this.messages['error23505']);
          } else {
            swal.fire(this.messages['error500']);
          }
        });
  }

  validateCupo(cupo: Matricula) {
    swal.fire(this.messages['validateQuotaQuestion']).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.service.get('matriculas/validate_cupo?matricula_id=' + cupo.id + '&estado=APROBADO').subscribe(
          response => {
            this.getCupos(this.actual_page);
            this.spinner.hide();
            swal.fire(this.messages['validateQuotaSuccess']);
          },
          error => {
            this.spinner.hide();
            swal.fire(this.messages['validateQuotaError']);
          });
      }
    });
  }

  validateCuposCarrera() {
    swal.fire(this.messages['validateQuotaQuestion'])
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.get('matriculas/validate_cupos_carrera?carrera_id=' + this.carrera.id).subscribe(
            response => {
              this.getCupos(this.actual_page);
              this.spinner.hide();
              this.total_register = this.cupos.length;
              swal.fire(this.messages['validateQuotaSuccess']);
            },
            error => {
              this.spinner.hide();
              swal.fire(this.messages['validateQuotaError']);
            });
        }
      });
  }

  validateCuposPeriodoAcademico() {
    if (this.periodoAcademico !== '') {
      swal.fire(this.messages['validateQuotaQuestion'])
        .then((result) => {
          if (result.value) {
            this.spinner.show();
            this.service.get('matriculas/validate_cupos_periodo_academico?carrera_id=' + this.carrera.id + '&periodo_academico_id='
              + this.periodoAcademico)
              .subscribe(
                response => {
                  this.getCupos(this.actual_page);
                  this.spinner.hide();
                  this.total_register = this.cupos.length;
                  swal.fire(this.messages['validateQuotaSuccess']);
                },
                error => {
                  this.spinner.hide();
                  swal.fire(this.messages['validateQuotaError']);
                });
          }
        });
    } else {
      swal.fire('Seleccione un periodo académico', '', 'warning');
    }
  }

  exportCuposCarrera() {
    window.open(this.urlExportCuposCarrera);
  }

  exportCuposPeriodo() {
    if (this.periodoAcademico) {
      window.open(this.urlExportCuposPeriodoAcademico);
    } else {
      swal.fire('Seleccione un periodo', '', 'warning');
    }
  }

  deleteCuposCarrera() {
    swal.fire(this.messages['deleteQuestion'])
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.delete('matriculas/delete_cupos_carrera?carrera_id=' + this.carrera.id).subscribe(
            response => {
              this.getCupos(this.actual_page);
              this.spinner.hide();
              this.total_register = this.cupos.length;
              this.messages['deleteSuccess']['text'] = response['cupos'] + ' ' + this.messages['deleteSuccess']['text'];
              swal.fire(this.messages['deleteSuccess']);
            },
            error => {
              this.spinner.hide();
              swal.fire(this.messages['deleteError']);
            });
        }
      });

  }

  deleteCuposPeriodoAcademico() {
    if (this.periodoAcademico !== '') {
      swal.fire(this.messages['deleteQuestion'])
        .then((result) => {
          if (result.value) {
            this.spinner.show();
            this.service.delete('matriculas/delete_cupos_periodo_academico?carrera_id=' + this.carrera.id
              + '&periodo_academico_id=' + this.periodoAcademico)
              .subscribe(
                response => {
                  this.getCupos(this.actual_page);
                  this.spinner.hide();
                  this.total_register = this.cupos.length;
                  this.messages['deleteSuccess']['text'] = response['cupos'] + ' ' + this.messages['deleteSuccess']['text'];
                  swal.fire(this.messages['deleteSuccess']);
                },
                error => {
                  this.spinner.hide();
                  swal.fire(this.messages['deleteError']);
                });
          }
        });
    } else {
      swal.fire('Seleccione un periodo académico', '', 'warning');
    }
  }

  sendEmailNotificacionCargaCupos() {
    this.notificacion.carrera_id = this.carrera.id;
   /*  this.notificacion.user_id = this.user.id; */
    this.notificacion.asunto = 'CARGA DE CUPOS';
    this.notificacion.body = 'Cupos subidos al sistema - Periodo Académico: ' + this.periodoAcademico;
    this.service.post('emails', this.notificacion)
      .subscribe(
        response => {
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          alert('error al enviar correo');
        });
  }

  getColumns() {
    return [
      {title: 'CARGA DE CUPOS', dataKey: 'errores'},
    ];
  }

  getbodyStyles() {
    return {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 10
    };
  }

  getalternateRowStyles() {
    return {
      fillColor: [255, 255, 255],
      textColor: 0,
      fontSize: 10
    };
  }

  exportErroresCargaCupos(errores: any) {
    const doc = new jsPDF('p', 'pt');
    const rows = [];
    let flag = false;
    if (errores['cedulas_estudiante']) {
      for (const iterator of errores['cedulas_estudiante']) {
        flag = true;
        rows.push({
          errores: iterator
        });
      }
    }
    if (errores['asignaturas']) {
      for (const iterator of errores['asignaturas']) {
        flag = true;
        rows.push({
          errores: iterator
        });
      }
    }
    if (flag) {
      doc.autoTable(this.getColumns(), rows, {
        startY: 50,
        margin: {top: 205, right: 50, left: 50, bottom: 100},
        bodyStyles: this.getbodyStyles(),
        alternateRowStyles: this.getalternateRowStyles(),
        styles: {
          cellPadding: 3,
          fontSize: 10,
          valign: 'middle',
          overflow: 'linebreak',
          lineWidth: 1,
        },
      });
      doc.save('carga_cupos' + '.pdf');
      window.open(doc.output('bloburl'));
    }
    this.spinner.hide();
  }

  sendEmailNotificacion(asunto: string, mensaje: string) {
    this.notificacion.carrera_id = 1;
/*     this.notificacion.user_id = this.user.id; */
    this.notificacion.asunto = asunto;
    this.notificacion.body = mensaje;
    this.service.post('emails', this.notificacion)
      .subscribe(
        response => {

        },
        error => {

          alert('error al enviar correo');
        });
  }
}
