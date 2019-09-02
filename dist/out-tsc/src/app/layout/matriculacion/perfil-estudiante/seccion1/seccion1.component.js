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
import { Estudiante } from '../../modelos/estudiante.model';
import { catalogos } from '../../../../../environments/catalogos';
import { InformacionParticipante } from '../../modelos/informacion-participante.model';
import { NgxSpinnerService } from 'ngx-spinner';
var Seccion1Component = /** @class */ (function () {
    function Seccion1Component(spinner, service) {
        this.spinner = spinner;
        this.service = service;
    }
    Seccion1Component.prototype.ngOnInit = function () {
        this.estadoDatos = '';
        this.user = JSON.parse(localStorage.getItem('user'));
        this.estudiante = new Estudiante();
        this.informacionParticipante = new InformacionParticipante();
        this.sexos = catalogos.sexos;
        this.tiposDiscapacidad = catalogos.tiposDiscapacidad;
        this.tiposDocumentos = catalogos.tiposIdentificacion;
        this.generos = catalogos.generos;
        this.tiposSangre = catalogos.tiposSangre;
        this.etnias = catalogos.etnias;
        this.estadosCiviles = catalogos.estadosCivil;
        this.getEstudianteLoad();
        this.getPaises();
        this.getProvincias();
    };
    Seccion1Component.prototype.updateEstudiante = function () {
        var _this = this;
        this.service.update('estudiantes/update_perfil', { 'estudiante': this.estudiante, 'informacion_estudiante': this.informacionParticipante })
            .subscribe(function (response) {
            _this.getEstudiante();
        }, function (error) {
            _this.getEstudiante();
        });
    };
    Seccion1Component.prototype.getEstudianteLoad = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('estudiantes/' + this.user.id).subscribe(function (response) {
            _this.estudiante = response['estudiante'];
            _this.informacionParticipante = response['informacion_estudiante'];
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
    Seccion1Component.prototype.getEstudiante = function () {
        var _this = this;
        // this.spinner.show();
        this.estadoDatos = 'Guardando...';
        this.service.get('estudiantes/' + this.user.id).subscribe(function (response) {
            _this.estudiante = response['estudiante'];
            _this.informacionParticipante = response['informacion_estudiante'];
            _this.estadoDatos = '';
            // this.spinner.hide();
        }, function (error) {
            _this.estadoDatos = '';
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
    };
    Seccion1Component.prototype.getPaises = function () {
        var _this = this;
        this.service.get('catalogos/paises').subscribe(function (response) {
            _this.paises = response['paises'];
        }, function (error) {
        });
    };
    Seccion1Component.prototype.getProvincias = function () {
        var _this = this;
        this.service.get('catalogos/provincias').subscribe(function (response) {
            _this.provincias = response['provincias'];
        }, function (error) {
        });
    };
    Seccion1Component.prototype.getCantones = function (idProvincia) {
        var _this = this;
        this.service.get('catalogos/cantones?provincia_id=' + idProvincia).subscribe(function (response) {
            _this.cantones = response['cantones'];
        }, function (error) {
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