var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardMatriculaRoutingModule } from './dashboard-matricula-routing.module';
import { DashboardMatriculaComponent } from './dashboard-matricula.component';
var DashboardMatriculaModule = /** @class */ (function () {
    function DashboardMatriculaModule() {
    }
    DashboardMatriculaModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                NgbCarouselModule,
                NgbAlertModule,
                DashboardMatriculaRoutingModule
            ],
            declarations: [
                DashboardMatriculaComponent
            ]
        })
    ], DashboardMatriculaModule);
    return DashboardMatriculaModule;
}());
export { DashboardMatriculaModule };
//# sourceMappingURL=dashboard-matricula.module.js.map