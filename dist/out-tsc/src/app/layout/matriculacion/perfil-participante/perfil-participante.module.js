var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PerfilParticipanteRoutingModule } from './perfil-participante-routing.module';
import { PerfilParticipanteComponent } from './perfil-participante.component';
import { Seccion1Component } from './seccion1/seccion1.component';
import { Seccion2Component } from './seccion2/seccion2.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FormularioComponent } from './formulario/formulario.component';
var PerfilParticipanteModule = /** @class */ (function () {
    function PerfilParticipanteModule() {
    }
    PerfilParticipanteModule = __decorate([
        NgModule({
            imports: [CommonModule, PerfilParticipanteRoutingModule, NgbModule, FormsModule],
            declarations: [
                PerfilParticipanteComponent,
                Seccion1Component,
                Seccion2Component,
                SolicitudComponent,
                FormularioComponent,
            ]
        })
    ], PerfilParticipanteModule);
    return PerfilParticipanteModule;
}());
export { PerfilParticipanteModule };
//# sourceMappingURL=perfil-participante.module.js.map