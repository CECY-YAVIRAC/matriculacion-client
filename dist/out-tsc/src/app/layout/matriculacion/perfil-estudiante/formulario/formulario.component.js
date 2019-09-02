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
import { InformacionParticipante } from '../../modelos/informacion-participante.model';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Matricula } from '../../modelos/matricula.model';
import { Carrera } from '../../modelos/carrera.model';
import { Instituto } from '../../modelos/instituto.model';
var FormularioComponent = /** @class */ (function () {
    function FormularioComponent(spinner, service) {
        this.spinner = spinner;
        this.service = service;
        this.spinnerConfiguracion = catalogos.spinnerConfiguracion[0];
    }
    FormularioComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.flagFormulario = false;
        this.ubicacionNacimiento = '';
        this.ubicacionResidencia = '';
        this.matricula = new Matricula();
        this.instituto = new Instituto();
        this.carrera = new Carrera();
        this.informacionParticipante = new InformacionParticipante();
        this.jornadas = catalogos.jornadas;
        this.pueblosNacionalidad = catalogos.pueblosNacionalidad;
        this.tiposInstituciones = catalogos.tiposInstituciones;
        this.tiposColegio = catalogos.tiposColegio;
        this.etnias = catalogos.etnias;
        this.sexos = catalogos.sexos;
        this.generos = catalogos.generos;
        this.opcionesSiNo = catalogos.opcionesSiNo;
        this.opcionesSiNoNA = catalogos.opcionesSiNoNA;
        this.tiposIdentificacion = catalogos.tiposIdentificacion;
        this.ocupacionesEstudiante = catalogos.ocupacionesEstudiante;
        this.tiposBachillerato = catalogos.tiposBachillerato;
        this.sectoresEconomicos = catalogos.sectoresEconomicos;
        this.alcancesVinculacion = catalogos.alcancesVinculacion;
        this.destinosIngreso = catalogos.destinosIngreso;
        this.nivelesFormacion = catalogos.nivelesFormacion;
        this.tiposSangre = catalogos.tiposSangre;
        this.categoriasMigratoria = catalogos.categoriasMigratoria;
        this.estadosCivil = catalogos.estadosCivil;
        this.tiposDiscapacidad = catalogos.tiposDiscapacidad;
        this.semestres = catalogos.semestres;
        this.paralelos = catalogos.paralelos;
        this.getFormulario();
    };
    FormularioComponent.prototype.updateEstudiante = function () {
        var _this = this;
        this.service.update('estudiantes/update_perfil', { 'estudiante': this.estudiante, 'informacion_estudiante': this.informacionParticipante })
            .subscribe(function (response) {
            _this.getEstudiante();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    FormularioComponent.prototype.getFormulario = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('estudiantes/formulario/' + this.user.id).subscribe(function (response) {
            _this.spinner.hide();
            _this.flagFormulario = true;
            _this.matricula = response['matricula'];
            console.log(_this.matricula.fecha);
            _this.informacionParticipante = response['informacion_estudiante'];
            _this.instituto = response['instituto'];
            _this.carrera = response['carrera'];
            _this.ubicacionNacimiento = response['ubicacion_nacimiento'][0];
            _this.ubicacionResidencia = response['ubicacion_residencia'][0];
            _this.calculateEdad(response['matricula']['estudiante']['fecha_nacimiento']);
        }, function (error) {
            _this.spinner.hide();
        });
    };
    FormularioComponent.prototype.getEstudiante = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('estudiantes/3').subscribe(function (response) {
            _this.estudiante = response['estudiante'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
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
    };
    FormularioComponent.prototype.getPaisesNacionalidad = function () {
        var _this = this;
        this.service.get('paises_nacionalidad').subscribe(function (response) {
            _this.paisesNacionalidad = response['paises_nacionalidad'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    FormularioComponent.prototype.getPaisesResidencia = function () {
        var _this = this;
        this.service.get('paises_residencia').subscribe(function (response) {
            _this.paisesNacionalidad = response['paises_residencia'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    FormularioComponent.prototype.validarPracticas = function () {
    };
    FormularioComponent.prototype.validarVinculacion = function () {
    };
    //validateTituloSuperior() {
    //this.informacionParticipante.titulo_superior_obtenido = '';
    //}
    //validateOcupacion() {
    //this.informacionParticipante.nombre_empresa_labora = '';
    // this.informacionParticipante.area_trabajo_empresa = '';
    // this.informacionParticipante.destino_ingreso = '';
    //}
    FormularioComponent.prototype.imprimir2 = function () {
        return xepOnline.Formatter.Format('formulario1', {
            render: 'download',
            filename: 'PDF'
        });
    };
    FormularioComponent.prototype.imprimir = function () {
        var _this = this;
        this.spinner.show();
        html2canvas(this.encabezadoHojaVida.nativeElement).then(function (canvasEncabezado) {
            var encabezadoHojaDatosImg = canvasEncabezado.toDataURL('image/png');
            html2canvas(_this.cuerpoHojaVida1.nativeElement).then(function (canvasCuerpo1) {
                var cuerpoHojaDatosImg1 = canvasCuerpo1.toDataURL('image/png');
                html2canvas(_this.pieHojaVida1.nativeElement).then(function (canvasPie1) {
                    var pieHojaDatosImg1 = canvasPie1.toDataURL('image/png');
                    html2canvas(_this.cuerpoHojaVida2.nativeElement).then(function (canvasCuerpo2) {
                        var cuerpoHojaDatosImg2 = canvasCuerpo2.toDataURL('image/png');
                        html2canvas(_this.pieHojaVida2.nativeElement).then(function (canvasPie2) {
                            var pieHojaDatosImg2 = canvasPie2.toDataURL('image/png');
                            var doc = new jsPDF();
                            doc.addImage(encabezadoHojaDatosImg, 'PNG', 10, 10, 190, 25);
                            doc.addImage(cuerpoHojaDatosImg1, 'PNG', 20, 40, 165, 230);
                            doc.addImage(pieHojaDatosImg1, 'PNG', 10, 280, 180, 5);
                            doc.addPage();
                            doc.addImage(encabezadoHojaDatosImg, 'PNG', 10, 10, 190, 30);
                            doc.addImage(cuerpoHojaDatosImg2, 'PNG', 20, 40, 165, 230);
                            doc.addImage(pieHojaDatosImg2, 'PNG', 10, 280, 180, 10);
                            var nombresParticipante = _this.matricula.participante.apellido1 + ' ' + _this.matricula.participante.apellido2
                                + ' ' + _this.matricula.participante.nombre1 + ' ' + _this.matricula.participante.nombre2;
                            doc.save('FORMULARIO-MATRICULA-' + nombresParticipante + '-' + _this.matricula.participante.identificacion + '.pdf');
                            // doc.autoPrint();
                            window.open(doc.output('bloburl'));
                            _this.spinner.hide();
                        });
                    });
                });
            });
        });
    };
    FormularioComponent.prototype.calculateEdad = function (fechaNacimiento) {
        if (fechaNacimiento != null && fechaNacimiento !== '') {
            var fecha_nacimiento = new Date(fechaNacimiento + ' GMT-0500');
            var ano = fecha_nacimiento.getFullYear();
            var mes = fecha_nacimiento.getMonth();
            var dia = fecha_nacimiento.getDay();
            var fecha_hoy = new Date();
            var ahora_ano = fecha_hoy.getFullYear();
            var ahora_mes = fecha_hoy.getMonth();
            var ahora_dia = fecha_hoy.getDate();
            var edad = (ahora_ano + 1900) - ano;
            if (ahora_mes < (mes - 1)) {
                edad--;
            }
            if (((mes - 1) === ahora_mes) && (ahora_dia < dia)) {
                edad--;
            }
            if (edad > 1900) {
                edad -= 1900;
            }
            this.edad = edad;
        }
    };
    __decorate([
        ViewChild('encabezadoHojaVida'),
        __metadata("design:type", ElementRef)
    ], FormularioComponent.prototype, "encabezadoHojaVida", void 0);
    __decorate([
        ViewChild('cuerpoHojaVida1'),
        __metadata("design:type", ElementRef)
    ], FormularioComponent.prototype, "cuerpoHojaVida1", void 0);
    __decorate([
        ViewChild('pieHojaVida1'),
        __metadata("design:type", ElementRef)
    ], FormularioComponent.prototype, "pieHojaVida1", void 0);
    __decorate([
        ViewChild('cuerpoHojaVida2'),
        __metadata("design:type", ElementRef)
    ], FormularioComponent.prototype, "cuerpoHojaVida2", void 0);
    __decorate([
        ViewChild('pieHojaVida2'),
        __metadata("design:type", ElementRef)
    ], FormularioComponent.prototype, "pieHojaVida2", void 0);
    FormularioComponent = __decorate([
        Component({
            selector: 'app-formulario',
            templateUrl: './formulario.component.html',
            styleUrls: ['./formulario.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], FormularioComponent);
    return FormularioComponent;
}());
export { FormularioComponent };
//# sourceMappingURL=formulario.component.js.map