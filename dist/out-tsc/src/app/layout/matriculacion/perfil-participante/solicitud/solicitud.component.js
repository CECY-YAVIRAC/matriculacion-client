var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from '../../service.service';
import { catalogos } from '../../../../../environments/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import kjua from 'kjua';
import 'jspdf-autotable';
import swal from 'sweetalert2';
var SolicitudComponent = /** @class */ (function () {
    function SolicitudComponent(spinner, service) {
        this.spinner = spinner;
        this.service = service;
    }
    SolicitudComponent.prototype.ngOnInit = function () {
        this.flagSolicitud = false;
        this.errors = '';
        this.user = JSON.parse(localStorage.getItem('user'));
        this.messages = catalogos.messages;
        this.jornadas = catalogos.jornadas;
        this.numerosMatricula = catalogos.numerosMatricula;
        this.getAsignaturas();
    };
    SolicitudComponent.prototype.validateEstudiante = function (estudiante, informacionParticipante) {
        this.errors = '';
        this.errors += '<h3>1. Datos Personales:</h3>';
        if (!estudiante.tipo_identificacion) {
            this.errors += '<li>Tipo Documento</li>';
        }
        if (!estudiante.identificacion) {
            this.errors += '<li>Identificación</li>';
        }
        /*if (!informacionParticipante.categoria_migratoria) {
          this.errors += '<li>Categoria Migratoria</li>';
        }
        if (!estudiante.nombre1) {
         this.errors += '<li>Primer Nombre</li>';
        }
        if (!estudiante.apellido1) {
          this.errors += '<li>Primer Nombre</li>';
        }
        if (!estudiante.tipo_sangre) {
          this.errors += '<li>Tipo Sangre</li>';
        }
        if (!estudiante.sexo) {
          this.errors += '<li>Sexo</li>';
        }
        if (!estudiante.fecha_nacimiento) {
          this.errors += '<li>Fecha de Nacimiento</li>';
        }
        if (!estudiante.correo_institucional) {
          this.errors += '<li>Correo Institucional</li>';
        }
        /*if (!informacionParticipante.codigo_postal) {
          this.errors += '<i>Código Postal</i>';
        }
        if (!informacionParticipante.telefono_celular || !informacionParticipante.telefono_celular) {
          this.errors += '<li>Teléfono Celular o Fijo</li>';
        }
        if (!informacionParticipante.direccion) {
          this.errors += '<li>Dirección</li>';
        }
        if (!informacionParticipante.estado_civil) {
          this.errors += '<li>Estado Civil</li>';
        }
    
        this.errors += '<hr>';
        this.errors += '<h3>2. Datos Académicos:</h3>';
        if (!estudiante.fecha_inicio_carrera) {
          this.errors += '<li>Fecha Inicio Carrera</li>';
        }
        if (!informacionParticipante.ha_repetido_asignatura) {
          this.errors += '<li>Ha Repetido Asignaturas</li>';
        }
        if (!informacionParticipante.ha_perdido_gratuidad) {
          this.errors += '<li>Ha Perdido la Gratuidad</li>';
        }
        if (!informacionParticipante.ha_realizado_practicas) {
          this.errors += '<li>Ha Realizado Prácticas</li>';
        }
        if (informacionParticipante.ha_realizado_practicas === 'SI') {
          if (!informacionParticipante.horas_practicas) {
            this.errors += '<li>Horas Prácticas</li>';
          }
          if (!informacionParticipante.sector_economico_practica) {
            this.errors += '<li>Sector Económico Prácticas</li>';
          }
          if (!informacionParticipante.tipo_institucion_practicas) {
            this.errors += '<li>Tipo Institución Prácticas</li>';
          }
        }
        if (!informacionParticipante.ha_realizado_vinculacion) {
          this.errors += '<li>Ha Realizado VInculación</li>';
        }
        if (informacionParticipante.ha_realizado_practicas === 'SI') {
          if (!informacionParticipante.horas_vinculacion) {
            this.errors += '<li>Horas Vinculación</li>';
          }
          if (!informacionParticipante.alcance_vinculacion) {
            this.errors += '<li>Alcance Vinculación</li>';
          }
        }
        if (!informacionParticipante.posee_titulo_superior) {
          this.errors += '<li>Posee Título Superior</li>';
        }
        if (!estudiante.tipo_colegio) {
          this.errors += '<li>Tipo de Colegio</li>';
        }
        if (!estudiante.tipo_bachillerato) {
          this.errors += '<li>Tipo Bachillerato</li>';
        }
        if (!estudiante.anio_graduacion) {
          this.errors += '<li>Año de Graduación del Colegio</li>';
        }
    
        this.errors += '<hr>';
        this.errors += '<h3>3. Datos Familiares:</h3>';
        if (!informacionParticipante.contacto_emergencia_telefono) {
          this.errors += '<li>Contacto Emergencia Teléfono</li>';
        }
        if (!informacionParticipante.contacto_emergencia_parentesco) {
          this.errors += '<li>Contacto Emergencia Parentesco</li>';
        }
        if (!informacionParticipante.contacto_emergencia_nombres) {
          this.errors += '<li>Contacto Emergencia Nombres</li>';
        }
        if (!informacionParticipante.habla_idioma_ancestral) {
          this.errors += '<li>Habla Idioma Ancestral</li>';
        }
        if (informacionParticipante.habla_idioma_ancestral === 'SI') {
          if (!informacionParticipante.idioma_ancestral) {
            this.errors += '<li>Idioma Ancestral</li>';
          }
        }
        if (!informacionParticipante.ocupacion) {
          this.errors += '<li>Ocupación</li>';
        }
        if (informacionParticipante.ocupacion === 'TRABAJA') {
          if (!informacionParticipante.nombre_empresa_labora) {
            this.errors += '<li>Nombre de la Empresa Donde Labora</li>';
          }
        }
        if (!informacionParticipante.destino_ingreso) {
          this.errors += '<li>Destino Ingresos</li>';
        }
        if (!informacionParticipante.nivel_formacion_padre) {
          this.errors += '<li>Nivel Formación Padre</li>';
        }
        if (!informacionParticipante.nivel_formacion_madre) {
          this.errors += '<li>Nivel Formación Madre</li>';
        }
        if (!informacionParticipante.ingreso_familiar) {
          this.errors += '<li>Ingreso Familiar</li>';
        }
        if (!informacionParticipante.numero_miembros_hogar) {
          this.errors += '<li>Número de Miembros del Hogar</li>';
        }
        if (!informacionParticipante.tiene_discapacidad) {
          this.errors += '<li>Tiene Carnet Conadis</li>';
        }
        if (informacionParticipante.tiene_discapacidad === '1') {
          if (!informacionParticipante.numero_carnet_conadis) {
            this.errors += '<li>Número Carnet Conadis</li>';
          }
          if (!informacionParticipante.tipo_discapacidad) {
            this.errors += '<li>Tipo Discapacidad</li>';
          }
          if (!informacionParticipante.porcentaje_discapacidad) {
            this.errors += '<li>Porcentaje Discapacidad</li>';
          }
        }
    
        this.errors += '<hr>';
        this.errors += '<h3>4. Ubicación:</h3>';
        if (!estudiante.canton_nacimiento) {
          this.errors += '<li>Cantón Nacimiento</li>';
        }
        if (!informacionParticipante.canton_residencia) {
          this.errors += '<li>Cantón Residencia</li>';
        }
        if (estudiante.etnia) {
          this.errors += '<li>Etnia</li>';
        }
        if (estudiante.etnia === 'IDÍGENA') {
          if (!estudiante.pueblo_nacionalidad) {
            this.errors += '<li>Pueblo Nacionalidad</li>';
          }
        }*/
    };
    SolicitudComponent.prototype.getBarcodeData = function (text, size) {
        if (size === void 0) { size = 900; }
        return kjua({
            render: 'canvas',
            crisp: true,
            minVersion: 1,
            ecLevel: 'Q',
            size: size,
            ratio: undefined,
            fill: '#333',
            back: '#fff',
            text: text,
            rounded: 10,
            quiet: 2,
            mode: 'plain',
            mSize: 5,
            mPosX: 50,
            mPosY: 100,
            fontname: 'sans-serif',
            fontcolor: '#3F51B5',
            image: undefined
        });
    };
    SolicitudComponent.prototype.generateSolicitudMatricula = function (datos, detalle) {
        var _this = this;
        console.log(datos);
        if (this.errors === '') {
            if (datos['codigo']) {
                var inicioY_1 = 60;
                var inicioX = 0;
                this.doc = new jsPDF('p', 'pt');
                var barcodeData = this.getBarcodeData(datos['codigo']);
                var logo = new Image();
                logo.src = 'assets/images/logo_instituto_' + datos['instituto_id'] + '.png';
                this.doc = new jsPDF('p', 'pt');
                this.doc.addImage(barcodeData, 'JPG', 70, 30, 80, 80);
                // Logo Benito Juarez
                if (datos['instituto_id'] === 1) {
                    this.doc.addImage(logo, 'JPG', 380, 60, logo.width, logo.height);
                }
                // Logos Gran Colombia y 24 de mayo
                if (datos['instituto_id'] === 2 || datos['instituto_id'] === 3) {
                    this.doc.addImage(logo, 'JPG', 450, 30, logo.width, logo.height);
                }
                // Logo Yavirac
                if (datos['instituto_id'] === 4) {
                    this.doc.addImage(logo, 'JPG', 425, 30, logo.width, logo.height);
                }
                this.doc.setFontSize(20);
                this.doc.setFontStyle('bold');
                this.doc.text('SOLICITUD DE MATRÍCULA', 150, inicioY_1 + 100);
                this.doc.setFontStyle('times');
                this.doc.setFontSize(12);
                var fechaSolicitud = datos['fecha_solicitud'];
                this.doc.text('Fecha: ' + fechaSolicitud.toString().substring(0, 10), 450, 80 + inicioY_1);
                this.doc.text('IVAN BORJA CARRERA', 70, 130 + inicioY_1);
                this.doc.text(datos['carrera'], 70, 150 + inicioY_1);
                this.doc.text('RECTOR.-', 70, 170 + inicioY_1);
                var nombresEstudiante_1 = datos['estudiante']['apellido1'] + ' ' + datos['estudiante']['apellido2'] + ' '
                    + datos['estudiante']['nombre1'] + ' ' + datos['estudiante']['nombre2'];
                var texto = 'Yo, ' + nombresEstudiante_1 + ', con cédula de ciudadanía N° ' + datos['estudiante']['identificacion']
                    + ', hago uso de mi cupo en la carrera ' + datos['carrera'] + ', en el periodo lectivo ' + datos['periodo_lectivo']['nombre']
                    + ' con la inscripción en las siguientes asignaturas:';
                this.doc.setFontStyle('normal');
                var splitTitle = this.doc.splitTextToSize(texto, 450);
                this.doc.text(70, 195 + inicioY_1, splitTitle);
                var rows = [];
                /*
                for (const iterator of detalle) {
                  rows.push({
                    codigo: iterator.asignatura_codigo,
                    asignatura: iterator.asignatura,
                    horas_docente: iterator.horas_docente,
                    horas_practica: iterator.horas_practica,
                    horas_autonoma: iterator.horas_autonoma,
                    periodo: iterator.periodo
                  });
                }
        
                this.doc.autoTable(this.getColumns(), rows, {
                  startY: 350 + inicioY,
                  margin: {top: 205, right: 70, left: 70, bottom: 100},
                  bodyStyles: this.getbodyStyles(),
                  alternateRowStyles: this.getalternateRowStyles(),
                  headerStyles: this.getheaderStyles(),
                  styles: {
                    cellPadding: 1,
                    fontSize: 8,
                    valign: 'middle',
                    overflow: 'linebreak',
                    tableWidth: 'auto',
                    lineWidth: 1,
                  },
                }); // generando
                */
                html2canvas(this.asignaturas.nativeElement).then(function (canvasAsignaturas) {
                    _this.asignaturasImg = canvasAsignaturas.toDataURL('image/png');
                    if (detalle.length <= 1) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 500);
                        _this.doc.text('Atentamente,', 70, 550);
                        _this.doc.text(nombresEstudiante_1, 70, 600);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 620);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 50);
                    }
                    else if (detalle.length <= 3) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 500);
                        _this.doc.text('Atentamente,', 70, 550);
                        _this.doc.text(nombresEstudiante_1, 70, 600);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 620);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 100);
                    }
                    else if (detalle.length <= 6) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 550);
                        _this.doc.text('Atentamente,', 70, 600);
                        _this.doc.text(nombresEstudiante_1, 70, 650);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 670);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 200);
                    }
                    else if (detalle.length <= 9) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 600);
                        _this.doc.text('Atentamente,', 70, 650);
                        _this.doc.text(nombresEstudiante_1, 70, 700);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 720);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 250);
                    }
                    else if (detalle.length <= 12) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 650);
                        _this.doc.text('Atentamente,', 70, 700);
                        _this.doc.text(nombresEstudiante_1, 70, 750);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 770);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 300);
                    }
                    else if (detalle.length <= 15) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 650);
                        _this.doc.text('Atentamente,', 70, 700);
                        _this.doc.text(nombresEstudiante_1, 70, 750);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 770);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 300);
                    }
                    else if (detalle.length <= 18) {
                        _this.doc.text('Con sentimiento de distinguida consideración.', 70, 700);
                        _this.doc.text('Atentamente,', 70, 730);
                        _this.doc.text(nombresEstudiante_1, 70, 780);
                        _this.doc.text('C.C. ' + datos['estudiante']['identificacion'], 70, 800);
                        _this.doc.addImage(_this.asignaturasImg, 'JPG', 60, 260 + inicioY_1, 500, 350);
                    }
                    _this.doc.save('SOLICITUD-MATRICULA-' + nombresEstudiante_1 + '.pdf');
                });
            }
        }
        else {
            swal.fire('Falta la siguiente información:', this.errors, 'error');
        }
    };
    SolicitudComponent.prototype.getSolicitudMatricula = function () {
        var _this = this;
        this.service.get('matriculas/solicitud_matricula?user_id=' + this.user.id).subscribe(function (response) {
            // this.validateEstudiante(response['solicitud'][0]['estudiante'], response['solicitud']['informacion_estudiante']);
            _this.matricula = response['solicitud'][0];
            _this.detalleMatricula = response['solicitud'];
            _this.generateSolicitudMatricula(response['solicitud'][0], response['solicitud']);
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    SolicitudComponent.prototype.getAsignaturas = function () {
        var _this = this;
        this.service.get('matriculas/solicitud_matricula?user_id=' + this.user.id).subscribe(function (response) {
            _this.flagSolicitud = true;
            _this.matricula = response['solicitud'][0];
            _this.detalleMatricula = response['solicitud'];
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    SolicitudComponent.prototype.getColumns = function () {
        return [
            { title: 'CÓDIGO', dataKey: 'codigo' },
            { title: 'ASIGNATURA', dataKey: 'asignatura' },
            { title: 'PERIODO', dataKey: 'periodo' },
            { title: 'H. DOCENTE', dataKey: 'horas_docente' },
            { title: 'H. PRÁCTICA', dataKey: 'horas_practica' },
            { title: 'H. AUTÓNOMA', dataKey: 'horas_autonoma' },
        ];
    };
    SolicitudComponent.prototype.getheaderStyles = function () {
        var headerStyle = {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 8
        };
        return headerStyle;
    };
    SolicitudComponent.prototype.getbodyStyles = function () {
        var bodyStyle = {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 8
        };
        return bodyStyle;
    };
    SolicitudComponent.prototype.getalternateRowStyles = function () {
        var alternateRowStyle = {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 8
        };
        return alternateRowStyle;
    };
    __decorate([
        ViewChild('encabezadoHojaVida'),
        __metadata("design:type", ElementRef)
    ], SolicitudComponent.prototype, "encabezadoHojaVida", void 0);
    __decorate([
        ViewChild('cuerpoHojaVida1'),
        __metadata("design:type", ElementRef)
    ], SolicitudComponent.prototype, "cuerpoHojaVida1", void 0);
    __decorate([
        ViewChild('pieHojaVida1'),
        __metadata("design:type", ElementRef)
    ], SolicitudComponent.prototype, "pieHojaVida1", void 0);
    __decorate([
        ViewChild('asignaturas'),
        __metadata("design:type", ElementRef)
    ], SolicitudComponent.prototype, "asignaturas", void 0);
    SolicitudComponent = __decorate([
        Component({
            selector: 'app-solicitud',
            templateUrl: './solicitud.component.html',
            styleUrls: ['./solicitud.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], SolicitudComponent);
    return SolicitudComponent;
}());
export { SolicitudComponent };
//# sourceMappingURL=solicitud.component.js.map