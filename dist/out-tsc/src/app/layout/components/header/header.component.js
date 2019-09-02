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
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from '../../matriculacion/service.service';
import { PeriodoLectivo } from '../../matriculacion/modelos/periodo-lectivo.model';
import { NgxSpinnerService } from 'ngx-spinner';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(spinner, service, translate, router) {
        var _this = this;
        this.spinner = spinner;
        this.service = service;
        this.translate = translate;
        this.router = router;
        this.translate.addLangs(['es']);
        this.translate.setDefaultLang('es');
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/es/) ? browserLang : 'en');
        this.router.events.subscribe(function (val) {
            if (val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                _this.isToggled()) {
                _this.toggleSidebar();
            }
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.periodoLectivoActual = new PeriodoLectivo();
        this.getPeriodoLectivoActual();
        this.pushRightClass = 'push-right';
        this.translate.setDefaultLang('es');
        this.changeLang('es');
    };
    HeaderComponent.prototype.isToggled = function () {
        var dom = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    };
    HeaderComponent.prototype.toggleSidebar = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    };
    HeaderComponent.prototype.rltAndLtr = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle('rtl');
    };
    HeaderComponent.prototype.onLoggedout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedin');
    };
    HeaderComponent.prototype.changeLang = function (language) {
        this.translate.use(language);
    };
    HeaderComponent.prototype.getPeriodoLectivoActual = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('periodo_lectivos/actual').subscribe(function (response) {
            _this.periodoLectivoActual = response['periodo_lectivo_actual'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService,
            ServiceService,
            TranslateService,
            Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map