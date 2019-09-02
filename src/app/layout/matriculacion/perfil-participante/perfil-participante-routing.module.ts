import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilParticipanteComponent } from './perfil-participante.component';

const routes: Routes = [
    {
        path: '',
        component: PerfilParticipanteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerfilParticipanteRoutingModule {}
