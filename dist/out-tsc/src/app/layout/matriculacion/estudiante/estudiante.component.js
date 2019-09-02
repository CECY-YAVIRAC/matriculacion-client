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
import { Notificacion } from '../modelos/notificacion.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
var EstudianteComponent = /** @class */ (function () {
    function EstudianteComponent(spinner, service, router, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.router = router;
        this.modalService = modalService;
        this.a = 0.1;
    }
    EstudianteComponent.prototype.ngOnInit = function () {
        this.spinnerConfiguracion = catalogos.spinnerConfiguracion;
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
    EstudianteComponent.prototype.createDetalleMatricula = function () {
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
    EstudianteComponent.prototype.cambiarEstadoFlagAsignaturasCupo = function () {
        this.flagAsignaturasCupo = false;
        this.getCupos(this.actual_page);
        this.getDetalleMatriculasForMalla();
    };
    EstudianteComponent.prototype.crearNumerosPaginacion = function () {
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
    EstudianteComponent.prototype.deleteDetalleCupo = function (detalleMatricula) {
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
    EstudianteComponent.prototype.deleteCupo = function (matricula) {
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
    EstudianteComponent.prototype.getAsignaturasCarrera = function () {
        var _this = this;
        this.service.get('matriculas/asignaturas?carrera_id=' + this.carrera.id).subscribe(function (response) {
            _this.cursos = response['asignaturas'];
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    EstudianteComponent.prototype.getCarreras = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('catalogos/carreras').subscribe(function (response) {
            _this.carreras = response['carreras'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EstudianteComponent.prototype.getCupo = function (event) {
        var _this = this;
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.flagPagination = true;
                this.getCupos(1);
            }
            else {
                this.flagPagination = false;
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
                    _this.estudiantes = response['cupo'];
                    _this.spinner.hide();
                    _this.total_register = _this.estudiantes.length;
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['error500']);
                });
            }
        }
    };
    EstudianteComponent.prototype.getCupos = function (page) {
        var _this = this;
        this.spinner.show();
        this.actual_page = page;
        var parametros = '?records_per_page=' + this.records_per_page + '&page=' + page;
        this.service.post('estudiantes/en_proceso' + parametros, null).subscribe(function (response) {
            _this.estudiantes = response['estudiantes']['data'];
            _this.total_pages = response['pagination']['last_page'];
            _this.total_register = response['pagination']['total'];
            _this.spinner.hide();
            _this.crearNumerosPaginacion();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EstudianteComponent.prototype.getDetalleMatricula = function (matricula) {
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
    EstudianteComponent.prototype.getDetalleMatriculasForMalla = function () {
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
            _this.spinner.hide();
        });
    };
    EstudianteComponent.prototype.getPeriodoAcademicos = function () {
        var _this = this;
        this.service.get('catalogos/periodo_academicos').subscribe(function (response) {
            _this.peridoAcademicos = response['periodo_academicos'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EstudianteComponent.prototype.getPeriodoLectivoActual = function () {
        var _this = this;
        this.service.get('periodo_lectivos/actual').subscribe(function (response) {
            _this.periodoLectivoActual = response['periodo_lectivo_actual'];
        }, function (error) {
        });
    };
    EstudianteComponent.prototype.getPeriodoLectivos = function () {
        var _this = this;
        this.service.get('periodo_lectivos').subscribe(function (response) {
            _this.periodoLectivos = response['periodo_lectivos'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EstudianteComponent.prototype.getTiposMatricula = function () {
        var _this = this;
        this.service.get('tipo_matriculas').subscribe(function (response) {
            _this.tiposMatricula = response['tipo_matriculas'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    EstudianteComponent.prototype.openDetalleMatricula = function (content) {
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
    EstudianteComponent.prototype.firstPagina = function () {
        this.getCupos(1);
        this.total_pages_temp = 10;
        this.crearNumerosPaginacion();
    };
    EstudianteComponent.prototype.lastPagina = function () {
        this.getCupos(this.total_pages);
        this.total_pages_temp = this.total_pages;
        this.crearNumerosPaginacion();
    };
    EstudianteComponent.prototype.paginacion = function (siguiente) {
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
    EstudianteComponent.prototype.uploadEstudiantes = function (ev) {
        var _this = this;
        this.spinner.show();
        this.archivo = ev.target;
        if (this.archivo.files.length > 0) {
            var form = new FormData();
            form.append('archivo', this.archivo.files[0]);
            this.service.upload('imports/estudiantes', form).subscribe(function (response) {
                _this.getCupos(1);
                _this.spinner.hide();
                swal.fire('CARCA DE ESTUDIANTES', '<li>' + ' Estudiantes Nuevos: ' + response['total_estudiantes_nuevos'] + '</li>' +
                    '<li>' + ' Estudiantes Modificados: ' + response['total_estudiantes_modificados'] + '</li>');
                _this.archivoTemp = '';
                _this.exportErroresCargaCupos(response['errores']);
                _this.sendEmailNotificacionCargaCupos();
            }, function (error) {
                _this.spinner.hide();
                _this.archivoTemp = '';
                swal.fire(_this.messages['uploadError']);
            });
        }
    };
    EstudianteComponent.prototype.uploadMatriculas = function (ev) {
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
    EstudianteComponent.prototype.updateDetalleMatricula = function (detalleMatricula) {
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
    EstudianteComponent.prototype.validateCupo = function (cupo) {
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
    EstudianteComponent.prototype.validateCuposCarrera = function () {
        var _this = this;
        swal.fire(this.messages['validateQuotaQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.get('matriculas/validate_estudiantes_carrera?carrera_id=' + _this.carrera.id).subscribe(function (response) {
                    _this.getCupos(_this.actual_page);
                    _this.spinner.hide();
                    _this.total_register = _this.estudiantes.length;
                    swal.fire(_this.messages['validateQuotaSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['validateQuotaError']);
                });
            }
        });
    };
    EstudianteComponent.prototype.validateCuposPeriodoAcademico = function () {
        var _this = this;
        if (this.periodoAcademico !== '') {
            swal.fire(this.messages['validateQuotaQuestion'])
                .then(function (result) {
                if (result.value) {
                    _this.spinner.show();
                    _this.service.get('matriculas/validate_estudiantes_periodo_academico?carrera_id=' + _this.carrera.id + '&periodo_academico_id='
                        + _this.periodoAcademico)
                        .subscribe(function (response) {
                        _this.getCupos(_this.actual_page);
                        _this.spinner.hide();
                        _this.total_register = _this.estudiantes.length;
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
    EstudianteComponent.prototype.exportCuposCarrera = function () {
        window.open(this.urlExportCuposCarrera);
    };
    EstudianteComponent.prototype.exportCuposPeriodo = function () {
        if (this.periodoAcademico) {
            window.open(this.urlExportCuposPeriodoAcademico);
        }
        else {
            swal.fire('Seleccione un periodo', '', 'warning');
        }
    };
    EstudianteComponent.prototype.deleteCuposCarrera = function () {
        var _this = this;
        swal.fire(this.messages['deleteQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('matriculas/delete_estudiantes_carrera?carrera_id=' + _this.carrera.id).subscribe(function (response) {
                    _this.getCupos(_this.actual_page);
                    _this.spinner.hide();
                    _this.total_register = _this.estudiantes.length;
                    _this.messages['deleteSuccess']['text'] = response['estudiantes'] + ' ' + _this.messages['deleteSuccess']['text'];
                    swal.fire(_this.messages['deleteSuccess']);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['deleteError']);
                });
            }
        });
    };
    EstudianteComponent.prototype.deleteCuposPeriodoAcademico = function () {
        var _this = this;
        if (this.periodoAcademico !== '') {
            swal.fire(this.messages['deleteQuestion'])
                .then(function (result) {
                if (result.value) {
                    _this.spinner.show();
                    _this.service.delete('matriculas/delete_estudiantes_periodo_academico?carrera_id=' + _this.carrera.id
                        + '&periodo_academico_id=' + _this.periodoAcademico)
                        .subscribe(function (response) {
                        _this.getCupos(_this.actual_page);
                        _this.spinner.hide();
                        _this.total_register = _this.estudiantes.length;
                        _this.messages['deleteSuccess']['text'] = response['estudiantes'] + ' ' + _this.messages['deleteSuccess']['text'];
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
    EstudianteComponent.prototype.sendEmailNotificacionCargaCupos = function () {
        var _this = this;
        this.notificacion.carrera_id = this.carrera.id;
        this.notificacion.asunto = 'CARGA DE ESTUDIANTES';
        this.notificacion.body = 'Estudiantes subidos al sistema';
        this.service.post('emails', this.notificacion)
            .subscribe(function (response) {
        }, function (error) {
            _this.spinner.hide();
            alert('error al enviar correo');
        });
    };
    EstudianteComponent.prototype.getColumns = function () {
        return [
            { title: 'LISTA DE ERRORES', dataKey: 'errores' },
        ];
    };
    EstudianteComponent.prototype.getbodyStyles = function () {
        return {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 10
        };
    };
    EstudianteComponent.prototype.getalternateRowStyles = function () {
        return {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 10
        };
    };
    EstudianteComponent.prototype.exportErroresCargaCupos = function (errores) {
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
            doc.save('errores_carga_cupo' + '.pdf');
            window.open(doc.output('bloburl'));
        }
    };
    EstudianteComponent = __decorate([
        Component({
            selector: 'app-cupo',
            templateUrl: './estudiante.component.html',
            styleUrls: ['./estudiante.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, Router, NgbModal])
    ], EstudianteComponent);
    return EstudianteComponent;
}());
export { EstudianteComponent };
//# sourceMappingURL=estudiante.component.js.map