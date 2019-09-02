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
import { UbicacionNacimiento } from '../../modelos/ubicacionNacimiento.model';
import { UbicacionResidencia } from '../../modelos/ubicacionResidencia.model';
var Seccion2Component = /** @class */ (function () {
    function Seccion2Component(spinner, service) {
        this.spinner = spinner;
        this.service = service;
    }
    Seccion2Component.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.estadoDatos = '';
        this.ubicacionResidencia = new UbicacionResidencia();
        this.ubicacionNacimiento = new UbicacionNacimiento();
        this.paises = new Array();
        this.provincias = new Array();
        this.estudiante = new Estudiante();
        this.informacionParticipante = new InformacionParticipante();
        this.sexos = catalogos.sexos;
        this.estadosCivil = catalogos.estadosCivil;
        this.tiposSangre = catalogos.tiposSangre;
        this.etnias = catalogos.etnias;
        this.opcionesSiNo = catalogos.opcionesSiNo;
        this.tiposDiscapacidad = catalogos.tiposDiscapacidad;
        this.pueblosNacionalidad = catalogos.pueblosNacionalidad;
        this.categoriasMigratoria = catalogos.categoriasMigratoria;
        this.getEstudianteLoad();
        this.getPaises();
        this.getProvincias();
    };
    Seccion2Component.prototype.updateEstudiante = function () {
        var _this = this;
        if (this.estudiante.canton_nacimiento.id === 0) {
            this.estudiante.canton_nacimiento.id = Number(this.ubicacionNacimiento.pais_id);
        }
        /*if (this.informacionParticipante.canton_residencia.id === 0) {
          this.informacionParticipante.canton_residencia.id = Number(this.ubicacionResidencia.pais_id);
        }*/
        this.service.update('estudiantes/update_perfil', { 'estudiante': this.estudiante, 'informacion_estudiante': this.informacionParticipante })
            .subscribe(function (response) {
            _this.getEstudiante();
        }, function (error) {
            _this.getEstudiante();
        });
    };
    Seccion2Component.prototype.getEstudianteLoad = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('estudiantes/' + this.user.id).subscribe(function (response) {
            _this.estudiante = response['estudiante'];
            _this.informacionParticipante = response['informacion_estudiante'];
            _this.ubicacionNacimiento = response['ubicacion_nacimiento'][0];
            _this.ubicacionResidencia = response['ubicacion_residencia'][0];
            if (_this.ubicacionResidencia) {
                _this.getCantonesResidencia(_this.ubicacionResidencia.provincia_id);
            }
            else {
                _this.ubicacionResidencia = new UbicacionResidencia();
                console.log(_this.ubicacionResidencia);
            }
            if (_this.ubicacionNacimiento) {
                _this.getCantonesNacimiento(_this.ubicacionNacimiento.provincia_id);
            }
            else {
                _this.ubicacionNacimiento = new UbicacionNacimiento();
                console.log(_this.ubicacionResidencia);
            }
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
    Seccion2Component.prototype.getEstudiante = function () {
        var _this = this;
        // this.spinner.show();
        this.estadoDatos = 'Guardando...';
        this.service.get('estudiantes/' + this.user.id).subscribe(function (response) {
            _this.estudiante = response['estudiante'];
            _this.informacionParticipante = response['informacion_estudiante'];
            _this.ubicacionNacimiento = response['ubicacion_nacimiento'][0];
            _this.ubicacionResidencia = response['ubicacion_residencia'][0];
            if (_this.ubicacionResidencia) {
                _this.getCantonesResidencia(_this.ubicacionResidencia.provincia_id);
            }
            else {
                _this.ubicacionResidencia = new UbicacionResidencia();
                console.log(_this.ubicacionResidencia);
            }
            if (_this.ubicacionNacimiento) {
                _this.getCantonesNacimiento(_this.ubicacionNacimiento.provincia_id);
            }
            else {
                _this.ubicacionNacimiento = new UbicacionNacimiento();
                console.log(_this.ubicacionResidencia);
            }
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
    Seccion2Component.prototype.getPaises = function () {
        var _this = this;
        this.service.get('catalogos/paises').subscribe(function (response) {
            _this.paises = response['paises'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    Seccion2Component.prototype.getProvincias = function () {
        var _this = this;
        this.service.get('catalogos/provincias').subscribe(function (response) {
            _this.provincias = response['provincias'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    Seccion2Component.prototype.getCantonesResidencia = function (idProvincia) {
        var _this = this;
        this.service.get('catalogos/cantones?provincia_id=' + idProvincia).subscribe(function (response) {
            _this.cantonesResidencia = response['cantones'];
        }, function (error) {
            _this.spinner.hide();
        });
    };
    Seccion2Component.prototype.getCantonesNacimiento = function (idProvincia) {
        var _this = this;
        this.service.get('catalogos/cantones?provincia_id=' + idProvincia).subscribe(function (response) {
            _this.cantonesNacimiento = response['cantones'];
        }, function (error) {
        });
    };
    /*validateDiscapacidad() {
      if (this.informacionParticipante.tiene_discapacidad === '2') {
        this.informacionParticipante.tipo_discapacidad = '7';
      } else {
        this.informacionParticipante.numero_carnet_conadis = '';
        this.informacionParticipante.tipo_discapacidad = '0';
        this.informacionParticipante.porcentaje_discapacidad = null;
      }
  
      }*/
    Seccion2Component.prototype.calculateEdad = function () {
        if (this.estudiante.fecha_nacimiento != null && this.estudiante.fecha_nacimiento.toString() !== '') {
            var fecha_nacimiento = new Date(this.estudiante.fecha_nacimiento.toString() + ' GMT-0500');
            var ano = fecha_nacimiento.getFullYear();
            var mes = fecha_nacimiento.getMonth();
            var dia = fecha_nacimiento.getDay();
            var fecha_hoy = new Date();
            var ahora_ano = fecha_hoy.getFullYear();
            var ahora_mes = fecha_hoy.getMonth();
            var ahora_dia = fecha_hoy.getDate();
            var edad = (ahora_ano + 1900) - ano;
            if (ahora_mes < (mes - 1)) {
                edad--;
            }
            if (((mes - 1) === ahora_mes) && (ahora_dia < dia)) {
                edad--;
            }
            if (edad > 1900) {
                edad -= 1900;
            }
            this.edad = edad;
        }
    };
    Seccion2Component.prototype.validateEtnia = function () {
        if (this.estudiante.etnia === '1' || this.estudiante.etnia === '8') {
            this.estudiante.pueblo_nacionalidad = '0';
        }
        else {
            this.estudiante.pueblo_nacionalidad = '34';
        }
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