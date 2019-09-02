import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service.service';
import {Estudiante} from '../../modelos/estudiante.model';
import {Ubicacion} from '../../modelos/ubicacion.model';
import {catalogos} from '../../../../../environments/catalogos';
import {InformacionParticipante} from '../../modelos/informacion-participante.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../modelos/user.model';

@Component({
  selector: 'app-seccion3',
  templateUrl: './seccion3.component.html',
  styleUrls: ['./seccion3.component.scss']
})
export class Seccion3Component implements OnInit {
  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
    this.spinnerConfiguracion = catalogos.spinnerConfiguracion[0];

  }

  estadoDatos: string;
  spinnerConfiguracion: any;
  estudiante: Estudiante;
  informacionParticipante: InformacionParticipante;
  paisesNacionalidad: Array<Ubicacion>;
  paisesResidencia: Array<Ubicacion>;
  tiposInstituciones: Array<any>;
  tiposColegio: Array<any>;
  tiposBachillerato: Array<any>;
  sectoresEconomicos: Array<any>;
  alcancesVinculacion: Array<any>;
  opcionesSiNo: Array<any>;
  ocupacionesEstudiante: Array<any>;
  destinosIngreso: Array<any>;
  nivelesFormacion: Array<any>;
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.estadoDatos = '';
    this.estudiante = new Estudiante();
    this.informacionParticipante = new InformacionParticipante();
    this.tiposInstituciones = catalogos.tiposInstituciones;
    this.tiposColegio = catalogos.tiposColegio;
    this.opcionesSiNo = catalogos.opcionesSiNo;
    this.ocupacionesEstudiante = catalogos.ocupacionesEstudiante;
    this.tiposBachillerato = catalogos.tiposBachillerato;
    this.sectoresEconomicos = catalogos.sectoresEconomicos;
    this.alcancesVinculacion = catalogos.alcancesVinculacion;
    this.destinosIngreso = catalogos.destinosIngreso;
    this.nivelesFormacion = catalogos.nivelesFormacion;
    this.getEstudianteLoad();
  }

  updateEstudiante(): void {
    this.service.update('estudiantes/update_perfil',
      {'estudiante': this.estudiante, 'informacion_estudiante': this.informacionParticipante})
      .subscribe(
        response => {
          this.getEstudiante();
        },
        error => {
          this.getEstudiante();
        });
  }

  getEstudianteLoad() {
    this.spinner.show();
    this.service.get('estudiantes/' + this.user.id).subscribe(
      response => {
        this.estudiante = response['estudiante'];
        this.informacionParticipante = response['informacion_estudiante'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        // if (error.status === 401) {
        //   swal({
        //     position: this.messages['createError401']['position'],
        //     type: this.messages['createError401']['type'],
        //     title: this.messages['createError401']['title'],
        //     text: this.messages['createError401']['text'],
        //     showConfirmButton: this.messages['createError401']['showConfirmButton'],
        //     backdrop: this.messages['createError401']['backdrop']
        //   });
        // }
      });
  }

  getEstudiante() {
    // this.spinner.show();
    this.estadoDatos = 'Guardando...';
    this.service.get('estudiantes/' + this.user.id).subscribe(
      response => {
        this.estudiante = response['estudiante'];
        this.informacionParticipante = response['informacion_estudiante'];
        // this.spinner.hide();
        this.estadoDatos = '';
      },
      error => {
        this.estadoDatos = '';
        // this.spinner.hide();
        // if (error.status === 401) {
        //   swal({
        //     position: this.messages['createError401']['position'],
        //     type: this.messages['createError401']['type'],
        //     title: this.messages['createError401']['title'],
        //     text: this.messages['createError401']['text'],
        //     showConfirmButton: this.messages['createError401']['showConfirmButton'],
        //     backdrop: this.messages['createError401']['backdrop']
        //   });
        // }
      });
  }

  getPaisesNacionalidad() {
    this.service.get('paises_nacionalidad').subscribe(
      response => {
        this.paisesNacionalidad = response['paises_nacionalidad'];
      },
      error => {


      });
  }

  getPaisesResidencia() {
    this.service.get('paises_residencia').subscribe(
      response => {
        this.paisesNacionalidad = response['paises_residencia'];
      },
      error => {

      });
  }

  /*validarPracticas() {
    this.informacionParticipante.horas_practicas = '';
    if (this.informacionParticipante.ha_realizado_practicas === '1') {
      this.informacionParticipante.tipo_institucion_practicas = '0';
      this.informacionParticipante.sector_economico_practica = '0';
    } else {
      this.informacionParticipante.tipo_institucion_practicas = '5';
      this.informacionParticipante.sector_economico_practica = '22';
    }*/

  }

  /*validarVinculacion() {
    if (this.informacionParticipante.ha_realizado_vinculacion === '1') {
      this.informacionParticipante.alcance_vinculacion = '0';
    } else {
      this.informacionParticipante.alcance_vinculacion = '5';
    }

  }

  validateTituloSuperior() {
    this.informacionParticipante.titulo_superior_obtenido = '';
  }

  validateOcupacion() {
    this.informacionParticipante.nombre_empresa_labora = '';
    if (this.informacionParticipante.ocupacion === '1') {
      this.informacionParticipante.area_trabajo_empresa = '22';
      this.informacionParticipante.destino_ingreso = '4';
    } else {
      this.informacionParticipante.area_trabajo_empresa = '0';
      
      this.informacionParticipante.destino_ingreso = '0';
    }
  }

}*/

