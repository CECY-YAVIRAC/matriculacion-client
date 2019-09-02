var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route) {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('isLoggedin') === 'true') {
            switch (route['_routerState']['url']) {
                case '/dashboard-matricula':
                    if (this.user.role.rol === '3' || this.user.role.rol === '4') {
                        return true;
                    }
                    break;
                case '/dashboard-cupo':
                    if (this.user.role.rol === '1') {
                        return true;
                    }
                    break;
                case '/dashboard':
                    if (this.user.role.rol === '3' || this.user.role.rol === '4') {
                        return true;
                    }
                    break;
                case '/matricula':
                    if (this.user.role.rol === '3' || this.user.role.rol === '4') {
                        return true;
                    }
                    break;
                case '/cupos':
                    if (this.user.role.rol === '1' || this.user.role.rol === '4') {
                        return true;
                    }
                    break;
                case '/perfil-estudiante':
                    if (this.user.role.rol === '2') {
                        return true;
                    }
                    break;
                default:
                    //this.router.navigate(['/access-denied']);
                    return true;
                    break;
            }
            //this.router.navigate(['/access-denied']);
            return true;
        }
        else {
            //this.router.navigate(['/login']);
            return true;
        }
    };
    AuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map