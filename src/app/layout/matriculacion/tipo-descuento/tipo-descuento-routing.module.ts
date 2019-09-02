import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TipoDescuentoComponent} from './tipo-descuento.component';

const routes: Routes = [
  {
    path: '',
    component: TipoDescuentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDescuentoRoutingModule {
}





