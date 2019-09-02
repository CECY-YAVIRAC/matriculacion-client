var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import kjua from 'kjua';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environments/environment';
import { Notificacion } from '../modelos/notificacion.model';
var MatriculaComponent = /** @class */ (function () {
    function MatriculaComponent(spinner, service, router, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.router = router;
        this.modalService = modalService;
    }
    MatriculaComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.buscador = '';
        this.notificacion = new Notificacion();
        this.flagPagination = true;
        this.total_detalle_matriculas_for_malla = new Array();
        this.total_pages_pagination = new Array();
        this.total_pages_temp = 10;
        this.records_per_page = 7;
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
    MatriculaComponent.prototype.createDetalleMatricula = function (razonNuevaAsignatura) {
        var _this = this;
        this.spinner.show();
        this.detalleMatriculaNuevo.estado = 'MATRICULADO';
        this.service.post('detalle_matriculas', { 'detalle_matricula': this.detalleMatriculaNuevo }).subscribe(function (response) {
            _this.getDetalleMatricula(_this.matriculaSeleccionada);
            _this.sendEmailNotificacion('Nueva Asignatura', razonNuevaAsignatura);
            _this.detalleMatriculaNuevo = new DetalleMatricula();
            _this.spinner.hide();
            swal.fire(_this.messages['createSuccess']);
        }, function (error) {
            _this.spinner.hide();
            if (error.error.errorInfo[0] === '23505') {
                swal.fire(_this.messages['error23505']);
            }
            else {
                swal.fire(_this.messages['error500']);
            }
            _this.detalleMatriculaNuevo = new DetalleMatricula();
        });
    };
    MatriculaComponent.prototype.cambiarEstadoFlagAsignaturasCupo = function () {
        this.flagAsignaturasCupo = false;
        if (this.buscador.trim() === '') {
            this.getAprobados(this.actual_page);
        }
        else {
            this.getAprobado();
        }
    };
    MatriculaComponent.prototype.crearNumerosPaginacion = function () {
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
    MatriculaComponent.prototype.deleteDetalleMatricula = function (detalleMatricula) {
        return __awaiter(this, void 0, void 0, function () {
            var razonAnularAsignatura;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, swal.fire(this.messages['deleteInputQuestion'])];
                    case 1:
                        razonAnularAsignatura = (_a.sent()).value;
                        if (razonAnularAsignatura) {
                            swal.fire(this.messages['deleteRegistrationQuestion'])
                                .then(function (result) {
                                if (result.value) {
                                    _this.spinner.show();
                                    _this.service.delete('matriculas/delete_detalle_matricula?id=' + detalleMatricula.id).subscribe(function (response) {
                                        _this.getDetalleMatricula(_this.matriculaSeleccionada);
                                        _this.sendEmailNotificacion('Anulación de Asignatura', razonAnularAsignatura);
                                        _this.spinner.hide();
                                        swal.fire(_this.messages['deleteSuccess']);
                                    }, function (error) {
                                        _this.spinner.hide();
                                        swal.fire(_this.messages['error500']);
                                    });
                                }
                            });
                        }
                        else {
                            swal.fire('Motivo', 'Debe contener por lo menos un motivo', 'warning');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatriculaComponent.prototype.getAsignaturasCarrera = function () {
        var _this = this;
        this.service.get('matriculas/asignaturas?carrera_id=' + this.carrera.id).subscribe(function (response) {
            _this.cursos = response['cursos'];
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    MatriculaComponent.prototype.getBarcodeData = function (text, size) {
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
    MatriculaComponent.prototype.getCarreras = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('catalogos/carreras?user_id=' + this.user.id).subscribe(function (response) {
            _this.carreras = response['carreras'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.filter = function (event) {
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.flagPagination = true;
                this.getAprobados(1);
            }
            else {
                this.flagPagination = false;
                this.getAprobado();
            }
        }
    };
    MatriculaComponent.prototype.getAprobado = function () {
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
        this.service.get('matriculas/aprobado' + parametros).subscribe(function (response) {
            _this.cupos = response['cupo'];
            _this.total_register = _this.cupos.length;
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    MatriculaComponent.prototype.getAprobados = function (page) {
        var _this = this;
        this.spinner.show();
        this.getDetalleMatriculasForMalla();
        this.urlExportCuposPeriodoAcademico = environment.API_URL + 'exports/cupos_periodo_academico?carrera_id=' + this.carrera.id
            + '&periodo_academico_id=' + this.periodoAcademico;
        this.urlExportCuposCarrera = environment.API_URL + 'exports/cupos_carrera?carrera_id=' + this.carrera.id;
        this.actual_page = page;
        var parametros = '?carrera_id=' + this.carrera.id + '&periodo_lectivo_id=' + this.periodoLectivoActual.id +
            '&periodo_academico_id=' + this.periodoAcademico + '&records_per_page=' + this.records_per_page
            + '&page=' + page;
        this.service.get('matriculas/aprobados' + parametros).subscribe(function (response) {
            _this.cupos = response['cupos']['data'];
            _this.total_pages = response['pagination']['last_page'];
            _this.total_register = response['pagination']['total'];
            _this.crearNumerosPaginacion();
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.getDetalleMatricula = function (matricula) {
        var _this = this;
        this.spinner.show();
        this.detalleMatricula = null;
        this.flagAsignaturasCupo = true;
        this.matriculaSeleccionada = matricula;
        this.getAsignaturasCarrera();
        this.getTiposMatricula();
        this.service.get('detalle_matriculas?id=' + matricula.id).subscribe(function (response) {
            _this.detalleMatricula = response['detalle_matricula'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    MatriculaComponent.prototype.getDetalleMatriculasForMalla = function () {
        var _this = this;
        var parametros = '?carrera_id=' + this.carrera.id
            + '&periodo_lectivo_id=' + this.periodoLectivoActual.id
            + '&periodo_academico_id=' + this.periodoAcademico;
        this.service.get('detalle_matriculas/count' + parametros)
            .subscribe(function (response) {
            _this.total_detalle_matriculas_anulados = response['anulados_count'];
            _this.total_detalle_matriculas_aprobados = response['aprobados_count'];
            _this.total_detalle_matriculas_matriculados = response['matriculados_count'];
            _this.total_detalle_matriculas_en_proceso = response['en_proceso_count'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.getPeriodoAcademicos = function () {
        var _this = this;
        this.service.get('catalogos/periodo_academicos').subscribe(function (response) {
            _this.peridoAcademicos = response['periodo_academicos'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.getPeriodoLectivoActual = function () {
        var _this = this;
        this.service.get('periodo_lectivos/actual').subscribe(function (response) {
            _this.periodoLectivoActual = response['periodo_lectivo_actual'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.getPeriodoLectivos = function () {
        var _this = this;
        this.service.get('periodo_lectivos').subscribe(function (response) {
            _this.periodoLectivos = response['periodo_lectivos'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.getTiposMatricula = function () {
        var _this = this;
        this.service.get('tipo_matriculas').subscribe(function (response) {
            _this.tiposMatricula = response['tipo_matriculas'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    MatriculaComponent.prototype.openDetalleMatricula = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var razonNuevaAsignatura;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, swal.fire(this.messages['createInputQuestion'])];
                    case 1:
                        razonNuevaAsignatura = (_a.sent()).value;
                        if (razonNuevaAsignatura) {
                            this.detalleMatriculaNuevo.matricula.id = this.matriculaSeleccionada.id;
                            this.modalService.open(content)
                                .result
                                .then((function (resultModal) {
                                if (resultModal === 'save') {
                                    _this.createDetalleMatricula(razonNuevaAsignatura);
                                }
                            }), (function (resultCancel) {
                            }));
                        }
                        else {
                            swal.fire('Motivo', 'Debe contener por lo menos un motivo', 'warning');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatriculaComponent.prototype.firstPagina = function () {
        this.getAprobados(1);
        this.total_pages_temp = 10;
        this.crearNumerosPaginacion();
    };
    MatriculaComponent.prototype.lastPagina = function () {
        this.getAprobados(this.total_pages);
        this.total_pages_temp = this.total_pages;
        this.crearNumerosPaginacion();
    };
    MatriculaComponent.prototype.paginacion = function (siguiente) {
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
        this.getAprobados(this.actual_page);
    };
    MatriculaComponent.prototype.updateMatricula = function (matricula) {
        return __awaiter(this, void 0, void 0, function () {
            var razonModificarMatricula;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, swal.fire(this.messages['updateInputQuestion'])];
                    case 1:
                        razonModificarMatricula = (_a.sent()).value;
                        if (razonModificarMatricula) {
                            this.spinner.show();
                            this.service.update('matriculas', { 'matricula': matricula })
                                .subscribe(function (response) {
                                _this.getAprobados(_this.actual_page);
                                _this.sendEmailNotificacion('Modificación de Matrícula', razonModificarMatricula);
                                _this.spinner.hide();
                                swal.fire(_this.messages['updateSuccess']);
                            }, function (error) {
                                _this.spinner.hide();
                                swal.fire(_this.messages['error500']);
                            });
                        }
                        else {
                            swal.fire('Motivo', 'Debe contener por lo menos un motivo', 'warning');
                            this.getAprobados(this.actual_page);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatriculaComponent.prototype.updateDetalleMatricula = function (detalleMatricula) {
        return __awaiter(this, void 0, void 0, function () {
            var razonModificarAsignatura;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, swal.fire(this.messages['updateInputQuestion'])];
                    case 1:
                        razonModificarAsignatura = (_a.sent()).value;
                        if (razonModificarAsignatura) {
                            this.spinner.show();
                            this.service.update('detalle_matriculas', { 'detalle_matricula': detalleMatricula })
                                .subscribe(function (response) {
                                _this.spinner.hide();
                                _this.getDetalleMatricula(_this.matriculaSeleccionada);
                                swal.fire(_this.messages['updateSuccess']);
                                _this.sendEmailNotificacion('Modificación Asignatura', razonModificarAsignatura);
                            }, function (error) {
                                _this.spinner.hide();
                                swal.fire(_this.messages['error500']);
                            });
                        }
                        else {
                            swal.fire('Motivo', 'Debe contener por lo menos un motivo', 'warning');
                            this.getDetalleMatricula(this.matriculaSeleccionada);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatriculaComponent.prototype.matricular = function (cupo) {
        var _this = this;
        swal.fire(this.messages['validateRegistrationQuestion'])
            .then(function (result) {
            if (result.value) {
                _this.service.get('matriculas/validate_cupo?matricula_id=' + cupo.id + '&estado=MATRICULADO').subscribe(function (response) {
                    _this.getAprobados(_this.actual_page);
                    // swal.fire(this.messages['validateRegistrationSuccess']);
                    _this.getCertificadoMatricula(cupo);
                }, function (error) {
                    _this.spinner.hide();
                    swal.fire(_this.messages['validateError']);
                });
            }
        });
    };
    MatriculaComponent.prototype.generateCertificado = function (datos, detalle) {
        if (datos['codigo']) {
            var inicioY = 60;
            var inicioX = 0;
            var barcodeData = this.getBarcodeData(environment.API_URL + 'certificado-matricula/' + datos['id']);
            var img = new Image();
            img.src = 'assets/images/logo_instituto_' + datos['instituto_id'] + '.png';
            this.doc = new jsPDF('p', 'pt');
            this.doc.addImage(barcodeData, 'JPG', 70, 30, 80, 80);
            if (datos['instituto_id'] === 1) {
                this.doc.addImage(img, 'JPG', 380, 60, img.width, img.height);
            }
            if (datos['instituto_id'] === 2 || datos['instituto_id'] === 3) {
                this.doc.addImage(img, 'JPG', 450, 30, img.width, img.height);
            }
            if (datos['instituto_id'] === 4) {
                this.doc.addImage(img, 'JPG', 425, 30, img.width, img.height);
            }
            this.doc.setFontSize(20);
            this.doc.setFontStyle('bold');
            this.doc.text('CERTIFICADO DE MATRÍCULA', 150, inicioY + 120);
            this.doc.setFontStyle('times');
            this.doc.setFontSize(12);
            this.doc.text(datos['fecha'], 425, inicioY + 70);
            this.doc.setFontStyle('bold');
            this.doc.text('MATRÍCULA:', 170, inicioY + 150);
            this.doc.text('FOLIO:', 395, inicioY + 150);
            this.doc.setFontStyle('times');
            this.doc.text(datos['codigo'], 150, inicioY + 170);
            this.doc.text(datos['folio'], 390, inicioY + 170);
            this.doc.setFontStyle('times');
            var apellidosEstudiante = datos['estudiante']['apellido1'] + ' ' + datos['estudiante']['apellido2'] + ' '
                + datos['estudiante']['nombre1'] + ' ' + datos['estudiante']['nombre2'];
            var texto = 'CERTIFICO que, ' + apellidosEstudiante + ', con cédula de ciudadanía N° ' + datos['estudiante']['identificacion']
                + ', previo cumpliento de los requisitos legales, se encuentra matriculado/a en ' + datos['periodo_academico']['nombre']
                + ' periodo académico de la carrera ' + datos['carrera']
                + ', para el periodo lectivo ' + datos['periodo_lectivo']['nombre']
                + ' con la inscripción en las siguientes asignaturas:';
            this.doc.setFontStyle('times');
            var splitTitle = this.doc.splitTextToSize(texto, 490);
            this.doc.text(50, inicioY + 225, splitTitle);
            var rows = [];
            for (var _i = 0, detalle_1 = detalle; _i < detalle_1.length; _i++) {
                var iterator = detalle_1[_i];
                rows.push({
                    codigo: iterator.asignatura_codigo,
                    asignatura: iterator.asignatura,
                    horas_docente: iterator.horas_docente,
                    horas_practica: iterator.horas_practica,
                    horas_autonoma: iterator.horas_autonoma,
                    periodo: iterator.periodo,
                    jornada: this.jornadas[iterator.jornada_asignatura - 1]['descripcion'],
                    numero_matricula: this.numerosMatricula[iterator.numero_matricula - 1]['descripcion']
                });
            }
            this.doc.autoTable(this.getColumns(), rows, {
                startY: inicioY + 300,
                margin: { top: 205, right: 50, left: 50, bottom: 100 },
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
            this.doc.text('Con sentimiento de distinguida consideración.', 70, inicioY + 600);
            this.doc.text('Atentamente,', 70, inicioY + 650);
            this.doc.setFontStyle('bold');
            this.doc.text('SECRETARÍA ACADÉMICA', 70, inicioY + 700);
            this.doc.text(datos['instituto'], 70, inicioY + 720);
            this.doc.save('CERTIFICADO-' + apellidosEstudiante + '-' + datos['codigo'] + '.pdf');
            this.doc.autoPrint();
            window.open(this.doc.output('bloburl'));
        }
    };
    MatriculaComponent.prototype.getCertificadoMatricula = function (matricula) {
        var _this = this;
        this.service.get('matriculas/certificado_matricula?matricula_id=' + matricula.id).subscribe(function (response) {
            if (response['certificado'].length > 0) {
                _this.generateCertificado(response['certificado'][0], response['certificado']);
            }
            else {
                swal.fire('No existen asignaturas!', 'No se puede generar el certificado sin asignaturas!', 'warning');
            }
        }, function (error) {
            _this.spinner.hide();
            swal.fire(_this.messages['error500']);
        });
    };
    MatriculaComponent.prototype.getColumns = function () {
        return [
            { title: 'CÓDIGO', dataKey: 'codigo' },
            { title: 'ASIGNATURA', dataKey: 'asignatura' },
            { title: 'PERIODO', dataKey: 'periodo' },
            { title: 'NÚMERO MATRÍCULA', dataKey: 'numero_matricula' },
            { title: 'JORNADA', dataKey: 'jornada' },
            { title: 'H. DOCENTE', dataKey: 'horas_docente' },
            { title: 'H. PRÁCTICA', dataKey: 'horas_practica' },
            { title: 'H. AUTÓNOMA', dataKey: 'horas_autonoma' }
        ];
    };
    MatriculaComponent.prototype.getheaderStyles = function () {
        var headerStyle = {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 7
        };
        return headerStyle;
    };
    MatriculaComponent.prototype.getbodyStyles = function () {
        var bodyStyle = {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 7
        };
        return bodyStyle;
    };
    MatriculaComponent.prototype.getalternateRowStyles = function () {
        var alternateRowStyle = {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontSize: 7
        };
        return alternateRowStyle;
    };
    MatriculaComponent.prototype.imprimir = function () {
        return xepOnline.Formatter.Format('certificado', {
            render: 'download',
            filename: 'PDF'
        });
    };
    MatriculaComponent.prototype.exportCuposCarrera = function () {
        window.open(this.urlExportCuposCarrera);
    };
    MatriculaComponent.prototype.exportCuposPeriodo = function () {
        if (this.periodoAcademico) {
            window.open(this.urlExportCuposPeriodoAcademico);
        }
        else {
            swal.fire('Seleccione un periodo', '', 'warning');
        }
    };
    MatriculaComponent.prototype.sendEmailNotificacion = function (asunto, mensaje) {
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
    MatriculaComponent = __decorate([
        Component({
            selector: 'app-matricula',
            templateUrl: './matricula.component.html',
            styleUrls: ['./matricula.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, Router, NgbModal])
    ], MatriculaComponent);
    return MatriculaComponent;
}());
export { MatriculaComponent };
//# sourceMappingURL=matricula.component.js.map