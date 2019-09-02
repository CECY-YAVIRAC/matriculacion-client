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
import { catalogos } from '../../../../../environments/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';
import { Matricula } from '../../modelos/matricula.model';
var Seccion2Component = /** @class */ (function () {
    function Seccion2Component(spinner, service) {
        this.spinner = spinner;
        this.service = service;
    }
    Seccion2Component.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.cursos = new Array();
        this.horarios = new Array();
        this.carreras = new Array();
        this.matricula = new Matricula();
        this.estadoDatos = '';
        this.condicionesAcademica = catalogos.condicionesAcademica;
        this.instruccionesAcademica = catalogos.instruccionesAcademica;
        this.averiguoCursos = catalogos.averiguoCursos;
        this.generos = catalogos.generos;
        this.niveles = catalogos.niveles;
        this.opcionesSiNo = catalogos.opcionesSiNo;
        this.getHorarios();
        this.getCursos();
        this.getMatriculaLoad();
    };
    Seccion2Component.prototype.updateMatricula = function () {
        this.matricula.id = 1;
        this.service.update('matriculas', { 'matricula': this.matricula })
            .subscribe(function (response) {
        }, function (error) {
        });
    };
    Seccion2Component.prototype.getCursos = function () {
        var _this = this;
        this.service.get('cursos')
            .subscribe(function (response) {
            console.log(response);
            _this.cursos = response['cursos'];
        }, function (error) {
        });
    };
    Seccion2Component.prototype.getHorarios = function () {
        var _this = this;
        this.service.get('horarios')
            .subscribe(function (response) {
            console.log(response);
            _this.horarios = response['horarios'];
        }, function (error) {
        });
    };
    Seccion2Component.prototype.getCarreras = function () {
        var _this = this;
        this.service.get('carreras')
            .subscribe(function (response) {
            console.log(response);
            _this.carreras = response['carreras'];
        }, function (error) {
        });
    };
    Seccion2Component.prototype.getMatriculaLoad = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('matriculas/' + '1').subscribe(function (response) {
            _this.matricula = response['matricula'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    Seccion2Component.prototype.validatePaisResidencia = function () {
        //this.ubicacionResidencia.provincia_id = '0';
        //this.informacionParticipante.canton_residencia = new Ubicacion();
    };
    Seccion2Component = __decorate([
        Component({
            selector: 'app-seccion2',
            templateUrl: './seccion2.component.html',
            styleUrls: ['./seccion2.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], Seccion2Component);
    return Seccion2Component;
}());
export { Seccion2Component };
//# sourceMappingURL=seccion2.component.js.map