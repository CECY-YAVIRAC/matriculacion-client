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
import { routerTransition } from '../../router.animations';
import { ServiceService } from '../matriculacion/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(spinner, service) {
        this.spinner = spinner;
        this.service = service;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.total_matriculados_count = new Array();
        this.getMatriculadosCount();
    };
    DashboardComponent.prototype.getMatriculadosCount = function () {
        var _this = this;
        this.spinner.show();
        this.service.get('matriculas/count')
            .subscribe(function (response) {
            _this.total_matriculados_count = response['matriculados_count'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss'],
            animations: [routerTransition()]
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map