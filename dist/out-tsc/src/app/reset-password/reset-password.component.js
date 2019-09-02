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
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../layout/matriculacion/service.service';
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(router, service, spinner) {
        this.router = router;
        this.service = service;
        this.spinner = spinner;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        if (this.validatePasswords()) {
            this.spinner.show();
            this.service.update('users/reset_password', { 'user': this.user })
                .subscribe(function (response) {
                _this.spinner.hide();
                if (response['role_id'] == '1') {
                    console.log(response['role_id']);
                    _this.router.navigate(['cupos']);
                }
                if (response['role_id'] == '2') {
                    _this.router.navigate(['perfil-estudiante']);
                }
                if (response['role_id'] == '3') {
                    _this.router.navigate(['dashboard-matricula']);
                }
                if (response['role_id'] == '4') {
                    _this.router.navigate(['dashboard-matricula']);
                }
            }, function (error) {
                _this.spinner.hide();
            });
        }
        else {
            swal.fire('Las contraseñas no coinciden', '', 'error');
        }
    };
    ResetPasswordComponent.prototype.validatePasswords = function () {
        if (this.user.password !== this.repeatPassword) {
            return false;
        }
        return true;
    };
    ResetPasswordComponent.prototype.redirect = function () {
        if (this.user.role.rol == '1') {
            this.router.navigate(['cupos']);
        }
        if (this.user.role.rol == '2') {
            this.router.navigate(['perfil-estudiante']);
        }
        if (this.user.role.rol == '3') {
            this.router.navigate(['dashboard-matricula']);
        }
        if (this.user.role.rol == '4') {
            this.router.navigate(['dashboard-matricula']);
        }
    };
    ResetPasswordComponent = __decorate([
        Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss']
        }),
        __metadata("design:paramtypes", [Router, ServiceService, NgxSpinnerService])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map