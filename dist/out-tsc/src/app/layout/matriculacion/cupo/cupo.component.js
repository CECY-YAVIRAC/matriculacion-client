var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Matricula } from '../modelos/matricula.model';
import { Carrera } from '../modelos/carrera.model';
import { catalogos } from '../../../../environments/catalogos';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleMatricula } from '../modelos/detalle-matricula.model';
import { PeriodoLectivo } from '../modelos/periodo-lectivo.model';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { Notificacion } from '../modelos/notificacion.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
var CupoComponent = /** @class */ (function () {
    function CupoComponent(spinner, service, router, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.router = router;
        this.modalService = modalService;
    }
    CupoComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.buscador = '';
        this.notificacion = new Notificacion();
        this.erroresCargaCupos = new Array();
        this.flagPagination = true;
        this.total_pages_pagination = new Array();
        this.total_pages_temp = 10;
        this.records_per_page = 6;
        this.actual_page = 1;
        this.total_pages = 1;
        this.paralelos = catalogos.paralelos;
        this.jornadas = catalogos.jornadas;
        this.numerosMatricula = catalogos.numerosMatricula;
        this.flagAsignaturasCupo = false;
        this.rutaActual = this.router.url;
        this.matriculaSeleccionada = new Matricula();
        this.periodoLectivoActual = new PeriodoLectivo();
        this.matriculas = new Array();
        this.detalleMatriculaNuevo = new DetalleMatricula();
        this.carrera = new Carrera();
        this.periodoAcademico = '';
        this.periodoLectivo = '';
        this.messages = catalogos.messages;
        this.getCarreras();
        this.getPeriodoAcademicos();
        this.getPeriodoLectivoActual();
        this.getPeriodoLectivos();
    };
    CupoComponent.prototype.createDetalleMatricula = function () {
        var _this = this;
        this.spinner.show();
        this.detalleMatriculaNuevo.estado = 'EN_PROCESO';
        this.service.post('detalle_matriculas', { 'detalle_matricula': this.detalleMatriculaNuevo }).subscribe(function (response) {
            _this.getDetalleMatricula(_this.matriculaSeleccionada);
            _this.spinner.hide();
            swal.fire(_this.messages['createSuccess']);
            _this.detalleMatriculaNuevo = new DetalleMatricula();
        }, function (error) {
            _this.spinner.hide();
            if (error.error.errorInfo[0] === '23505') {
                swal.fire(_this.messages['error23505']);
            }
            else {
                swal.fire(_this.messages['error500']);
            }
        });
    };
    CupoComponent.prototype.cambiarEstadoFlagAsignaturasCupo = function () {
        this.flagAsignaturasCupo = false;
        if (this.buscador.trim() === '') {
            this.getCupos(1);
        }
        else {
            this.getCupo();
        }
    };
    CupoComponent.prototype.crearNumerosPaginacion = function () {
        if (this.total_pages > 10) {
            for (var i = 0; i < 10; i++) {
                this.total_pages_pagination[i] = i + this.total_pages_temp - 9;
            }
        }
        else {
            this.total_pages_pagination = new Array();
            for (var i = 0; i < this.total_pages; i++) {
                this.total_pages_pagination[i] = i + 1;
            }
        }
    };
    CupoComponent.prototype.deleteDetalleCupo = function (detalleMatricula) {
        var _this = this;
        swal.fire(this.messages['deleteQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('matriculas/delete_detalle_cupo?id=' + detalleMatricula.id).subscribe(function (response) {
                    _this.getDetalleMatricula(_this.matriculaSeleccionada);
                    _this.spinner.hide();
                    swal.fire(_this.messages['deleteSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['error500']);
                });
            }
        });
    };
    CupoComponent.prototype.deleteCupo = function (matricula) {
        var _this = this;
        swal.fire(this.messages['deleteQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('matriculas/cupo?id=' + matricula.id).subscribe(function (response) {
                    _this.getCupos(_this.actual_page);
                    _this.spinner.hide();
                    swal.fire(_this.messages['deleteSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['error500']);
                });
            }
        });
    };
    CupoComponent.prototype.getAsignaturasCarrera = function () {
        var _this = this;
        this.service.get('matriculas/asignaturas?carrera_id=' + this.carrera.id).subscribe(function (response) {
            _this.cursos = response['asignaturas'];
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    CupoComponent.prototype.getCarreras = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('catalogos/carreras?user_id=' + this.user.id).subscribe(function (response) {
            _this.carreras = response['carreras'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CupoComponent.prototype.filter = function (event) {
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.flagPagination = true;
                this.getCupos(1);
            }
            else {
                this.flagPagination = false;
                this.getCupo();
            }
        }
    };
    CupoComponent.prototype.getCupo = function () {
        var _this = this;
        this.total_pages = 1;
        this.crearNumerosPaginacion();
        this.buscador = this.buscador.toUpperCase();
        var parametros = '?identificacion=' + this.buscador
            + '&apellido1=' + this.buscador
            + '&apellido2=' + this.buscador
            + '&nombre1=' + this.buscador
            + '&nombre2=' + this.buscador
            + '&carrera_id=' + this.carrera.id;
        this.spinner.show();
        this.service.get('matriculas/cupo' + parametros).subscribe(function (response) {
            _this.cupos = response['cupo'];
            _this.spinner.hide();
            _this.total_register = _this.cupos.length;
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    CupoComponent.prototype.getCupos = function (page) {
        var _this = this;
        this.flagPagination = true;
        this.buscador = '';
        this.spinner.show();
        this.getDetalleMatriculasForMalla();
        this.urlExportCuposPeriodoAcademico = environment.API_URL + 'exports/cupos_periodo_academico?carrera_id=' + this.carrera.id
            + '&periodo_academico_id=' + this.periodoAcademico;
        this.urlExportCuposCarrera = environment.API_URL + 'exports/cupos_carrera?carrera_id=' + this.carrera.id;
        this.actual_page = page;
        var parametros = '?carrera_id=' + this.carrera.id + '&periodo_lectivo_id=' + this.periodoLectivoActual.id +
            '&periodo_academico_id=' + this.periodoAcademico + '&records_per_page=' + this.records_per_page + '&page=' + page;
        this.service.get('matriculas/cupos' + parametros).subscribe(function (response) {
            _this.cupos = response['cupos']['data'];
            _this.total_pages = response['pagination']['last_page'];
            _this.total_register = response['pagination']['total'];
            _this.crearNumerosPaginacion();
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CupoComponent.prototype.getDetalleMatricula = function (matricula) {
        var _this = this;
        this.spinner.show();
        this.detalleMatricula = null;
        this.flagAsignaturasCupo = true;
        this.matriculaSeleccionada = matricula;
        this.getAsignaturasCarrera();
        this.getTiposMatricula();
        this.service.get('detalle_matriculas?id=' + matricula.id).subscribe(function (response) {
            _this.spinner.hide();
            _this.detalleMatricula = response['detalle_matricula'];
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    CupoComponent.prototype.getDetalleMatriculasForMalla = function () {
        var _this = this;
        var parametros = '?carrera_id=' + this.carrera.id
            + '&periodo_lectivo_id=' + this.periodoLectivoActual.id
            + '&periodo_academico_id=' + this.periodoAcademico;
        this.service.get('detalle_matriculas/count' + parametros)
            .subscribe(function (response) {
            _this.total_detalle_matriculas_en_proceso = response['en_proceso_count'];
            _this.total_detalle_matriculas_aprobados = response['aprobados_count'];
            _this.total_detalle_matriculas_matriculados = response['matriculados_count'];
        }, function (error) {
        });
    };
    CupoComponent.prototype.getPeriodoAcademicos = function () {
        var _this = this;
        this.service.get('catalogos/periodo_academicos').subscribe(function (response) {
            _this.peridoAcademicos = response['periodo_academicos'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CupoComponent.prototype.getPeriodoLectivoActual = function () {
        var _this = this;
        this.service.get('periodo_lectivos/actual').subscribe(function (response) {
            _this.periodoLectivoActual = response['periodo_lectivo_actual'];
        }, function (error) {
        });
    };
    CupoComponent.prototype.getPeriodoLectivos = function () {
        var _this = this;
        this.service.get('periodo_lectivos').subscribe(function (response) {
            _this.periodoLectivos = response['periodo_lectivos'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CupoComponent.prototype.getTiposMatricula = function () {
        var _this = this;
        this.service.get('tipo_matriculas').subscribe(function (response) {
            _this.tiposMatricula = response['tipo_matriculas'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CupoComponent.prototype.openDetalleMatricula = function (content) {
        var _this = this;
        this.detalleMatriculaNuevo.matricula.id = this.matriculaSeleccionada.id;
        this.modalService.open(content)
            .result
            .then((function (resultModal) {
            if (resultModal === 'save') {
                _this.createDetalleMatricula();
            }
        }), (function (resultCancel) {
        }));
    };
    CupoComponent.prototype.firstPagina = function () {
        this.getCupos(1);
        this.total_pages_temp = 10;
        this.crearNumerosPaginacion();
    };
    CupoComponent.prototype.lastPagina = function () {
        this.getCupos(this.total_pages);
        this.total_pages_temp = this.total_pages;
        this.crearNumerosPaginacion();
    };
    CupoComponent.prototype.paginacion = function (siguiente) {
        if (siguiente) {
            if (this.actual_page === this.total_pages) {
                return;
            }
            else {
                if (this.total_pages_temp !== this.total_pages) {
                    this.total_pages_temp++;
                    this.crearNumerosPaginacion();
                }
                this.actual_page++;
            }
        }
        else {
            if (this.actual_page === 1) {
                return;
            }
            else {
                this.actual_page--;
                this.total_pages_temp--;
                this.crearNumerosPaginacion();
            }
        }
        this.getCupos(this.actual_page);
    };
    CupoComponent.prototype.updateMatricula = function (matricula) {
        var _this = this;
        this.spinner.show();
        this.service.update('matriculas', { 'matricula': matricula })
            .subscribe(function (response) {
            if (_this.buscador === '') {
                _this.getCupos(_this.actual_page);
            }
            else {
                _this.getCupo();
            }
            _this.spinner.hide();
            swal.fire(_this.messages['updateSuccess']);
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    CupoComponent.prototype.uploadCupos = function (ev) {
        var _this = this;
        if (this.periodoAcademico) {
            this.spinner.show();
            this.archivo = ev.target;
            if (this.archivo.files.length > 0) {
                var form = new FormData();
                form.append('archivo', this.archivo.files[0]);
                this.service.upload('imports/cupos?carrera_id=' + this.carrera.id, form).subscribe(function (response) {
                    _this.getCupos(1);
                    _this.spinner.hide();
                    swal.fire('CARCA DE CUPOS', '<li>' + ' Cupos Nuevos: ' + response['total_cupos_nuevos'] + '</li>' +
                        '<li>' + ' Cupos Modificados: ' + response['total_cupos_modificados'] + '</li>');
                    _this.archivoTemp = '';
                    _this.exportErroresCargaCupos(response['errores']);
                    _this.sendEmailNotificacionCargaCupos();
                }, function (error) {
                    _this.spinner.hide();
                    _this.archivoTemp = '';
                    swal.fire(_this.messages['uploadError']);
                });
            }
        }
        else {
            this.archivoTemp = '';
            swal.fire('Seleccione un periodo', '', 'warning');
        }
    };
    CupoComponent.prototype.uploadMatriculas = function (ev) {
        var _this = this;
        this.spinner.show();
        this.archivo = ev.target;
        if (this.archivo.files.length > 0) {
            var form = new FormData();
            form.append('archivo', this.archivo.files[0]);
            this.service.upload('imports/matriculas', form).subscribe(function (response) {
                _this.getCupos(1);
                _this.spinner.hide();
            }, function (error) {
                _this.spinner.hide();
                alert('Error al subir el archivo');
            });
        }
    };
    CupoComponent.prototype.updateDetalleMatricula = function (detalleMatricula) {
        var _this = this;
        this.spinner.show();
        this.service.update('detalle_matriculas', { 'detalle_matricula': detalleMatricula })
            .subscribe(function (response) {
            _this.getDetalleMatricula(_this.matriculaSeleccionada);
            _this.spinner.hide();
            swal.fire(_this.messages['updateSuccess']);
        }, function (error) {
            _this.spinner.hide();
            if (error.error.errorInfo[0] === '23505') {
                swal.fire(_this.messages['error23505']);
            }
            else {
                swal.fire(_this.messages['error500']);
            }
        });
    };
    CupoComponent.prototype.validateCupo = function (cupo) {
        var _this = this;
        swal.fire(this.messages['validateQuotaQuestion']).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.get('matriculas/validate_cupo?matricula_id=' + cupo.id + '&estado=APROBADO').subscribe(function (response) {
                    _this.getCupos(_this.actual_page);
                    _this.spinner.hide();
                    swal.fire(_this.messages['validateQuotaSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['validateQuotaError']);
                });
            }
        });
    };
    CupoComponent.prototype.validateCuposCarrera = function () {
        var _this = this;
        swal.fire(this.messages['validateQuotaQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.get('matriculas/validate_cupos_carrera?carrera_id=' + _this.carrera.id).subscribe(function (response) {
                    _this.getCupos(_this.actual_page);
                    _this.spinner.hide();
                    _this.total_register = _this.cupos.length;
                    swal.fire(_this.messages['validateQuotaSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['validateQuotaError']);
                });
            }
        });
    };
    CupoComponent.prototype.validateCuposPeriodoAcademico = function () {
        var _this = this;
        if (this.periodoAcademico !== '') {
            swal.fire(this.messages['validateQuotaQuestion'])
                .then(function (result) {
                if (result.value) {
                    _this.spinner.show();
                    _this.service.get('matriculas/validate_cupos_periodo_academico?carrera_id=' + _this.carrera.id + '&periodo_academico_id='
                        + _this.periodoAcademico)
                        .subscribe(function (response) {
                        _this.getCupos(_this.actual_page);
                        _this.spinner.hide();
                        _this.total_register = _this.cupos.length;
                        swal.fire(_this.messages['validateQuotaSuccess']);
                    }, function (error) {
                        _this.spinner.hide();
                        swal.fire(_this.messages['validateQuotaError']);
                    });
                }
            });
        }
        else {
            swal.fire('Seleccione un periodo académico', '', 'warning');
        }
    };
    CupoComponent.prototype.exportCuposCarrera = function () {
        window.open(this.urlExportCuposCarrera);
    };
    CupoComponent.prototype.exportCuposPeriodo = function () {
        if (this.periodoAcademico) {
            window.open(this.urlExportCuposPeriodoAcademico);
        }
        else {
            swal.fire('Seleccione un periodo', '', 'warning');
        }
    };
    CupoComponent.prototype.deleteCuposCarrera = function () {
        var _this = this;
        swal.fire(this.messages['deleteQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('matriculas/delete_cupos_carrera?carrera_id=' + _this.carrera.id).subscribe(function (response) {
                    _this.getCupos(_this.actual_page);
                    _this.spinner.hide();
                    _this.total_register = _this.cupos.length;
                    _this.messages['deleteSuccess']['text'] = response['cupos'] + ' ' + _this.messages['deleteSuccess']['text'];
                    swal.fire(_this.messages['deleteSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['deleteError']);
                });
            }
        });
    };
    CupoComponent.prototype.deleteCuposPeriodoAcademico = function () {
        var _this = this;
        if (this.periodoAcademico !== '') {
            swal.fire(this.messages['deleteQuestion'])
                .then(function (result) {
                if (result.value) {
                    _this.spinner.show();
                    _this.service.delete('matriculas/delete_cupos_periodo_academico?carrera_id=' + _this.carrera.id
                        + '&periodo_academico_id=' + _this.periodoAcademico)
                        .subscribe(function (response) {
                        _this.getCupos(_this.actual_page);
                        _this.spinner.hide();
                        _this.total_register = _this.cupos.length;
                        _this.messages['deleteSuccess']['text'] = response['cupos'] + ' ' + _this.messages['deleteSuccess']['text'];
                        swal.fire(_this.messages['deleteSuccess']);
                    }, function (error) {
                        _this.spinner.hide();
                        swal.fire(_this.messages['deleteError']);
                    });
                }
            });
        }
        else {
            swal.fire('Seleccione un periodo académico', '', 'warning');
        }
    };
    CupoComponent.prototype.sendEmailNotificacionCargaCupos = function () {
        var _this = this;
        this.notificacion.carrera_id = this.carrera.id;
        this.notificacion.user_id = this.user.id;
        this.notificacion.asunto = 'CARGA DE CUPOS';
        this.notificacion.body = 'Cupos subidos al sistema - Periodo Académico: ' + this.periodoAcademico;
        this.service.post('emails', this.notificacion)
            .subscribe(function (response) {
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
            alert('error al enviar correo');
        });
    };
    CupoComponent.prototype.getColumns = function () {
        return [
            { title: 'CARGA DE CUPOS', dataKey: 'errores' },
        ];
    };
    CupoComponent.prototype.getbodyStyles = function () {
        return {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 10
        };
    };
    CupoComponent.prototype.getalternateRowStyles = function () {
        return {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 10
        };
    };
    CupoComponent.prototype.exportErroresCargaCupos = function (errores) {
        var doc = new jsPDF('p', 'pt');
        var rows = [];
        var flag = false;
        if (errores['cedulas_estudiante']) {
            for (var _i = 0, _a = errores['cedulas_estudiante']; _i < _a.length; _i++) {
                var iterator = _a[_i];
                flag = true;
                rows.push({
                    errores: iterator
                });
            }
        }
        if (errores['asignaturas']) {
            for (var _b = 0, _c = errores['asignaturas']; _b < _c.length; _b++) {
                var iterator = _c[_b];
                flag = true;
                rows.push({
                    errores: iterator
                });
            }
        }
        if (flag) {
            doc.autoTable(this.getColumns(), rows, {
                startY: 50,
                margin: { top: 205, right: 50, left: 50, bottom: 100 },
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
    };
    CupoComponent.prototype.sendEmailNotificacion = function (asunto, mensaje) {
        this.notificacion.carrera_id = 1;
        this.notificacion.user_id = this.user.id;
        this.notificacion.asunto = asunto;
        this.notificacion.body = mensaje;
        this.service.post('emails', this.notificacion)
            .subscribe(function (response) {
        }, function (error) {
            alert('error al enviar correo');
        });
    };
    CupoComponent = __decorate([
        Component({
            selector: 'app-cupo',
            templateUrl: './cupo.component.html',
            styleUrls: ['./cupo.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, Router, NgbModal])
    ], CupoComponent);
    return CupoComponent;
}());
export { CupoComponent };
//# sourceMappingURL=cupo.component.js.map