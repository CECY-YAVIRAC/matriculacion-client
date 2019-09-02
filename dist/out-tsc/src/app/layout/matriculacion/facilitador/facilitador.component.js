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
import { Facilitador } from '../modelos/facilitador.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
var FacilitadorComponent = /** @class */ (function () {
    function FacilitadorComponent(spinner, service, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.modalService = modalService;
    }
    FacilitadorComponent.prototype.ngOnInit = function () {
        this.facilitadorSeleccionada = new Facilitador();
        this.facilitadorNuevo = new Facilitador();
        this.buscador = '';
        this.flagPagination = true;
        this.getFacilitador();
    };
    FacilitadorComponent.prototype.getFacilitador = function () {
        var _this = this;
        this.service.get('facilitadores')
            .subscribe(function (response) {
            _this.facilitadores = response['facilitadores'];
        }, function (error) {
        });
    };
    FacilitadorComponent.prototype.createFacilitador = function () {
        var _this = this;
        console.log(this.facilitadorNuevo);
        this.spinner.show();
        this.service.post('facilitadores', { 'facilitador': this.facilitadorNuevo }).subscribe(function (response) {
            _this.getFacilitador();
            _this.spinner.hide();
            _this.facilitadorNuevo = new Facilitador();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    FacilitadorComponent.prototype.openFacilitador = function (content, facilitadores, flag) {
        var _this = this;
        console.log(flag);
        if (flag) {
            this.facilitadorNuevo = new Facilitador();
            console.log('si');
        }
        else {
            this.facilitadorNuevo = facilitadores;
            console.log('no');
        }
        this.modalService.open(content)
            .result
            .then((function (resultModal) {
            if (resultModal === 'save') {
                if (flag) {
                    console.log('create');
                    _this.createFacilitador();
                }
                else {
                    console.log('update');
                    _this.updateFacilitador(facilitadores);
                }
            }
        }), (function (resultCancel) {
        }));
    };
    FacilitadorComponent.prototype.filter = function (event) {
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.getBuscar();
            }
            else {
                this.getBuscar();
            }
        }
    };
    FacilitadorComponent.prototype.getBuscar = function () {
        var _this = this;
        this.buscador = this.buscador.toUpperCase();
        var parametros = '?identificacion=' + this.buscador
            + '&apellido1=' + this.buscador
            + '&apellido2=' + this.buscador
            + '&nombre1=' + this.buscador
            + '&nombre2=' + this.buscador;
        +'&facilitador_id=' + this.facilitadores.id;
        this.spinner.show();
        this.service.get('facilitadores' + parametros).subscribe(function (response) {
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    FacilitadorComponent.prototype.deleteFacilitador = function (facilitador) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a borrar un facilitador existente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo borrarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('facilitadores?facilitador_id=' + facilitador.id).subscribe(function (response) {
                    _this.getFacilitador();
                    _this.spinner.hide();
                    swal.fire('Borrado!', 'Usted ha borrado un facilitador existente.', 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    FacilitadorComponent.prototype.updateFacilitador = function (facilitadores) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a actualizar un facilitador existente!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#c44',
            confirmButtonText: 'Si, deseo actualizarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.service.update('facilitadores', { 'facilitador': facilitadores })
                    .subscribe(function (response) {
                    swal.fire('Actualizado!', 'Usted actualizo un facilitador existente.', 'success');
                });
            }
        });
    };
    FacilitadorComponent = __decorate([
        Component({
            selector: 'app-facilitador',
            templateUrl: './facilitador.component.html',
            styleUrls: ['./facilitador.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, NgbModal])
    ], FacilitadorComponent);
    return FacilitadorComponent;
}());
export { FacilitadorComponent };
//# sourceMappingURL=facilitador.component.js.map