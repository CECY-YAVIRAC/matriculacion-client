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
import { Asignacion } from '../modelos/asignacion.model';
import { catalogos } from '../../../../environments/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
var AsignacionComponent = /** @class */ (function () {
    function AsignacionComponent(spinner, service, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.modalService = modalService;
    }
    AsignacionComponent.prototype.ngOnInit = function () {
        this.asignacionSeleccionada = new Asignacion();
        this.asignacionNuevo = new Asignacion();
        this.buscador = '';
        this.flagPagination = true;
        this.tipos = catalogos.tiposCursos;
        this.cursos = new Array();
        this.facilitadores = new Array();
        this.getAsignacion();
        this.getCursos();
        this.getFacilitadores();
    };
    AsignacionComponent.prototype.getAsignacion = function () {
        var _this = this;
        this.service.get('asignaciones')
            .subscribe(function (response) {
            _this.asignaciones = response['asignaciones'];
        }, function (error) {
        });
    };
    AsignacionComponent.prototype.getCursos = function () {
        var _this = this;
        this.service.get('cursos')
            .subscribe(function (response) {
            console.log(response);
            _this.cursos = response['cursos'];
        }, function (error) {
        });
    };
    AsignacionComponent.prototype.getFacilitadores = function () {
        var _this = this;
        this.service.get('facilitadores')
            .subscribe(function (response) {
            console.log(response);
            _this.facilitadores = response['facilitadores'];
        }, function (error) {
        });
    };
    AsignacionComponent.prototype.createAsignacion = function () {
        var _this = this;
        console.log(this.asignacionNuevo);
        this.spinner.show();
        this.service.post('asignaciones', { 'asignacion': this.asignacionNuevo }).subscribe(function (response) {
            _this.getAsignacion();
            _this.spinner.hide();
            _this.asignacionNuevo = new Asignacion();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    AsignacionComponent.prototype.openAsignacion = function (content, asignacion, flag) {
        var _this = this;
        console.log(flag);
        if (flag) {
            this.asignacionNuevo = new Asignacion();
            console.log('si');
        }
        else {
            this.asignacionNuevo = asignacion;
            console.log('no');
        }
        this.modalService.open(content)
            .result
            .then((function (resultModal) {
            if (resultModal === 'save') {
                if (flag) {
                    console.log('create');
                    _this.createAsignacion();
                }
                else {
                    console.log('update');
                    _this.updateAsignacion(asignacion);
                }
            }
        }), (function (resultCancel) {
        }));
    };
    AsignacionComponent.prototype.filter = function (event) {
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.flagPagination = true;
                this.getAsignacion();
            }
            else {
                this.flagPagination = false;
                this.getAsignacion();
            }
        }
    };
    AsignacionComponent.prototype.deleteAsignacion = function (asignacion) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a borrar una asignación existente!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3048d6',
            cancelButtonColor: '#c44',
            confirmButtonText: 'Si, deseo borrarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('asignaciones?asignacion_id=' + asignacion.id).subscribe(function (response) {
                    _this.getAsignacion();
                    _this.spinner.hide();
                    swal.fire('Borrado!', 'Usted ha borrado una asignación existente.', 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    AsignacionComponent.prototype.updateAsignacion = function (asignacion) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a actualizar una asignación existente!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#c44',
            confirmButtonText: 'Si, deseo actualizarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.service.update('asignaciones', { 'asignacion': asignacion })
                    .subscribe(function (response) {
                    swal.fire('Actualizado!', 'Usted actualizo una asignación existente.', 'success');
                });
            }
        });
    };
    AsignacionComponent = __decorate([
        Component({
            selector: 'app-asignacion',
            templateUrl: './asignacion.component.html',
            styleUrls: ['./asignacion.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, NgbModal])
    ], AsignacionComponent);
    return AsignacionComponent;
}());
export { AsignacionComponent };
//# sourceMappingURL=asignacion.component.js.map