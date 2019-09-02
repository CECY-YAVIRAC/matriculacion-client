import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {PerfilParticipanteRoutingModule} from './perfil-participante-routing.module';
import {PerfilParticipanteComponent} from './perfil-participante.component';
import {Seccion1Component} from './seccion1/seccion1.component';
import {Seccion2Component} from './seccion2/seccion2.component';
import {SolicitudComponent} from './solicitud/solicitud.component';
import {FormularioComponent} from './formulario/formulario.component';


@NgModule({
  imports: [CommonModule, PerfilParticipanteRoutingModule, NgbModule, FormsModule],
  declarations: [
    PerfilParticipanteComponent,
    Seccion1Component,
    Seccion2Component,    
    SolicitudComponent,
    FormularioComponent,
  ]
})
export class PerfilParticipanteModule {
}
