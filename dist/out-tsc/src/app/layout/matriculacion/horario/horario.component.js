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
import { Horario } from '../modelos/horario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
var HorarioComponent = /** @class */ (function () {
    function HorarioComponent(spinner, service, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.modalService = modalService;
    }
    HorarioComponent.prototype.ngOnInit = function () {
        this.horarioSeleccionada = new Horario();
        this.horarioNuevo = new Horario();
        this.buscador = '';
        this.flagPagination = true;
        this.getHorario();
    };
    HorarioComponent.prototype.getHorario = function () {
        var _this = this;
        this.service.get('horarios')
            .subscribe(function (response) {
            _this.horarios = response['horarios'];
        }, function (error) {
        });
    };
    HorarioComponent.prototype.createHorario = function () {
        var _this = this;
        console.log(this.horarioNuevo);
        this.spinner.show();
        this.service.post('horarios', { 'horario': this.horarioNuevo }).subscribe(function (response) {
            _this.getHorario();
            _this.spinner.hide();
            _this.horarioNuevo = new Horario();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    HorarioComponent.prototype.openHorario = function (content, horarios, flag) {
        var _this = this;
        console.log(flag);
        if (flag) {
            this.horarioNuevo = new Horario();
            console.log('si');
        }
        else {
            this.horarioNuevo = horarios;
            console.log('no');
        }
        this.modalService.open(content)
            .result
            .then((function (resultModal) {
            if (resultModal === 'save') {
                if (flag) {
                    console.log('create');
                    _this.createHorario();
                }
                else {
                    console.log('update');
                    _this.updateHorario(horarios);
                }
            }
        }), (function (resultCancel) {
        }));
    };
    HorarioComponent.prototype.filter = function (event) {
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.flagPagination = true;
                this.getHorario();
            }
            else {
                this.flagPagination = false;
                this.getHorario();
            }
        }
    };
    HorarioComponent.prototype.deleteHorario = function (horario) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a borrar un horario existente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo borrarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('horarios?horario_id=' + horario.id).subscribe(function (response) {
                    _this.getHorario();
                    _this.spinner.hide();
                    swal.fire('Borrado!', 'Usted ha borrado un horario existente.', 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    HorarioComponent.prototype.updateHorario = function (horarios) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a actualizar un horario existente!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#c44',
            confirmButtonText: 'Si, deseo actualizarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.service.update('horarios', { 'horario': horarios })
                    .subscribe(function (response) {
                    swal.fire('Actualizado!', 'Usted actualizo un horario existente.', 'success');
                });
            }
        });
    };
    HorarioComponent = __decorate([
        Component({
            selector: 'app-horario',
            templateUrl: './horario.component.html',
            styleUrls: ['./horario.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, NgbModal])
    ], HorarioComponent);
    return HorarioComponent;
}());
export { HorarioComponent };
//# sourceMappingURL=horario.component.js.map