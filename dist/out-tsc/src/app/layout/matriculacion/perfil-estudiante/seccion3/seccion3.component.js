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
var Seccion3Component = /** @class */ (function () {
    function Seccion3Component(spinner, service) {
        this.spinner = spinner;
        this.service = service;
        this.spinnerConfiguracion = catalogos.spinnerConfiguracion[0];
    }
    Seccion3Component.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.estadoDatos = '';
        this.estudiante = new Estudiante();
        this.informacionParticipante = new InformacionParticipante();
        this.tiposInstituciones = catalogos.tiposInstituciones;
        this.tiposColegio = catalogos.tiposColegio;
        this.opcionesSiNo = catalogos.opcionesSiNo;
        this.ocupacionesEstudiante = catalogos.ocupacionesEstudiante;
        this.tiposBachillerato = catalogos.tiposBachillerato;
        this.sectoresEconomicos = catalogos.sectoresEconomicos;
        this.alcancesVinculacion = catalogos.alcancesVinculacion;
        this.destinosIngreso = catalogos.destinosIngreso;
        this.nivelesFormacion = catalogos.nivelesFormacion;
        this.getEstudianteLoad();
    };
    Seccion3Component.prototype.updateEstudiante = function () {
        var _this = this;
        this.service.update('estudiantes/update_perfil', { 'estudiante': this.estudiante, 'informacion_estudiante': this.informacionParticipante })
            .subscribe(function (response) {
            _this.getEstudiante();
        }, function (error) {
            _this.getEstudiante();
        });
    };
    Seccion3Component.prototype.getEstudianteLoad = function () {
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
    Seccion3Component.prototype.getEstudiante = function () {
        var _this = this;
        // this.spinner.show();
        this.estadoDatos = 'Guardando...';
        this.service.get('estudiantes/' + this.user.id).subscribe(function (response) {
            _this.estudiante = response['estudiante'];
            _this.informacionParticipante = response['informacion_estudiante'];
            // this.spinner.hide();
            _this.estadoDatos = '';
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
    Seccion3Component.prototype.getPaisesNacionalidad = function () {
        var _this = this;
        this.service.get('paises_nacionalidad').subscribe(function (response) {
            _this.paisesNacionalidad = response['paises_nacionalidad'];
        }, function (error) {
        });
    };
    Seccion3Component.prototype.getPaisesResidencia = function () {
        var _this = this;
        this.service.get('paises_residencia').subscribe(function (response) {
            _this.paisesNacionalidad = response['paises_residencia'];
        }, function (error) {
        });
    };
    Seccion3Component = __decorate([
        Component({
            selector: 'app-seccion3',
            templateUrl: './seccion3.component.html',
            styleUrls: ['./seccion3.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], Seccion3Component);
    return Seccion3Component;
}());
export { Seccion3Component };
/*validarVinculacion() {
  if (this.informacionParticipante.ha_realizado_vinculacion === '1') {
    this.informacionParticipante.alcance_vinculacion = '0';
  } else {
    this.informacionParticipante.alcance_vinculacion = '5';
  }

}

validateTituloSuperior() {
  this.informacionParticipante.titulo_superior_obtenido = '';
}

validateOcupacion() {
  this.informacionParticipante.nombre_empresa_labora = '';
  if (this.informacionParticipante.ocupacion === '1') {
    this.informacionParticipante.area_trabajo_empresa = '22';
    this.informacionParticipante.destino_ingreso = '4';
  } else {
    this.informacionParticipante.area_trabajo_empresa = '0';
    
    this.informacionParticipante.destino_ingreso = '0';
  }
}

}*/
//# sourceMappingURL=seccion3.component.js.map