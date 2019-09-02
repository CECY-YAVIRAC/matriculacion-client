var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './curso.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
var CursoModule = /** @class */ (function () {
    function CursoModule() {
    }
    CursoModule = __decorate([
        NgModule({
            imports: [CommonModule, CursoRoutingModule, FormsModule, PdfViewerModule],
            declarations: [CursoComponent]
        })
    ], CursoModule);
    return CursoModule;
}());
export { CursoModule };
//# sourceMappingURL=curso.module.js.map