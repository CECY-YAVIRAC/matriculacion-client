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
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { ServiceService } from '../layout/matriculacion/service.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(spinner, service, translate, router) {
        this.spinner = spinner;
        this.service = service;
        this.translate = translate;
        this.router = router;
        this.translate.addLangs(['es']);
        this.translate.setDefaultLang('es');
        // const browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
        this.translate.use('es');
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.correoValido = false;
    };
    LoginComponent.prototype.onLoggedin = function (event) {
        var _this = this;
        if (event.which === 13 || event === 13) {
            this.spinner.show();
            var clientId = 1;
            var clientSecret = 'gCKtEi6W8KpXgWCv4sDSlkM6IErcQQLTuvW5j5yg';
            var grantType = 'password';
            this.userName = this.userName.toLocaleLowerCase();
            if (this.userName.search('@') === -1) {
                this.userName = this.userName + '@yavirac.edu.ec';
            }
            this.service.postPublic('oauth/token', {
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': grantType,
                'username': this.userName,
                'password': this.password
            }).subscribe(function (response) {
                localStorage.setItem('token', JSON.stringify(response['access_token']));
                localStorage.setItem('isLoggedin', 'true');
                _this.service.get('users?email=' + _this.userName).subscribe(function (response2) {
                    localStorage.setItem('user', JSON.stringify(response2['user']));
                    if (response2['user']['role']['rol'] === '1') {
                        _this.router.navigate(['dashboard-cupo']);
                    }
                    if (response2['user']['role']['rol'] === '2') {
                        _this.router.navigate(['perfil-estudiante']);
                    }
                    if (response2['user']['role']['rol'] === '3') {
                        _this.router.navigate(['dashboard-matricula']);
                    }
                    if (response2['user']['role']['rol'] === '4') {
                        _this.router.navigate(['dashboard-matricula']);
                    }
                });
                _this.spinner.hide();
            }, function (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedin');
                swal.fire('Credenciales Incorrectas', 'Nombre de Usuario y/o Contraseña incorrectos', 'warning');
                _this.spinner.hide();
            });
        }
    };
    LoginComponent.prototype.forgotPassword = function () {
        var _this = this;
        if (this.userName != null && this.userName !== '') {
            if (this.userName.search('@') === -1) {
                this.userName = this.userName + '@yavirac.edu.ec';
            }
            if (this.validateCorreoElectronico(this.userName)) {
                this.spinner.show();
                this.service.postPublic('password/email', { 'email': this.userName }).subscribe(function (response) {
                    console.log(response);
                    _this.spinner.hide();
                    swal.fire('¡Correo Electrónico Enviado!', 'Ingrese a su correo electrónico institucional', 'success');
                }, function (error) {
                    console.log(error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('isLoggedin');
                    _this.spinner.hide();
                    swal.fire('¡Correo Electrónico Enviado!', 'Ingrese a su correo electrónico institucional', 'info');
                });
            }
        }
        else {
            swal.fire('¡Correo Electrónico Institucional Incorrecto!', 'Ingrese un correo válido', 'error');
        }
    };
    LoginComponent.prototype.validateCorreoElectronico = function (correoElectronico) {
        var expreg = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
        if (expreg.test(correoElectronico)) {
            this.correoValido = true;
            return true;
        }
        else {
            this.correoValido = false;
            return false;
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            animations: [routerTransition()]
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, TranslateService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map