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
import { ServiceService } from '../../service.service';
import { Participante } from '../../modelos/participante.model';
import { catalogos } from '../../../../../environments/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';
var Seccion1Component = /** @class */ (function () {
    function Seccion1Component(spinner, service) {
        this.spinner = spinner;
        this.service = service;
    }
    Seccion1Component.prototype.ngOnInit = function () {
        this.estadoDatos = '';
        this.user = JSON.parse(localStorage.getItem('user'));
        this.participante = new Participante();
        this.sexos = catalogos.sexos;
        this.generos = catalogos.generos;
        this.etnias = catalogos.etnias;
        this.getParticipanteLoad();
    };
    Seccion1Component.prototype.updateParticipante = function () {
        this.participante.id = 1;
        this.service.update('participantes', { 'participante': this.participante })
            .subscribe(function (response) {
        }, function (error) {
        });
    };
    Seccion1Component.prototype.getParticipanteLoad = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('participantes/' + '1').subscribe(function (response) {
            _this.participante = response['participante'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    Seccion1Component.prototype.validateTipoIdentificacion = function () {
        //    this.estudiante.identificacion = null;
    };
    Seccion1Component = __decorate([
        Component({
            selector: 'app-seccion1',
            templateUrl: './seccion1.component.html',
            styleUrls: ['./seccion1.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], Seccion1Component);
    return Seccion1Component;
}());
export { Seccion1Component };
//# sourceMappingURL=seccion1.component.js.map