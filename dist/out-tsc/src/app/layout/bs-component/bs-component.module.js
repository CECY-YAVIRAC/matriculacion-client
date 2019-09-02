var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsComponentRoutingModule } from './bs-component-routing.module';
import { BsComponentComponent } from './bs-component.component';
import { AlertComponent, ButtonsComponent, ModalComponent, CollapseComponent, DatePickerComponent, DropdownComponent, PaginationComponent, PopOverComponent, ProgressbarComponent, TabsComponent, RatingComponent, TooltipComponent, TimepickerComponent } from './components';
import { PageHeaderModule } from '../../shared';
var BsComponentModule = /** @class */ (function () {
    function BsComponentModule() {
    }
    BsComponentModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                BsComponentRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                NgbModule,
                PageHeaderModule
            ],
            declarations: [
                BsComponentComponent,
                ButtonsComponent,
                AlertComponent,
                ModalComponent,
                CollapseComponent,
                DatePickerComponent,
                DropdownComponent,
                PaginationComponent,
                PopOverComponent,
                ProgressbarComponent,
                TabsComponent,
                RatingComponent,
                TooltipComponent,
                TimepickerComponent
            ]
        })
    ], BsComponentModule);
    return BsComponentModule;
}());
export { BsComponentModule };
//# sourceMappingURL=bs-component.module.js.map