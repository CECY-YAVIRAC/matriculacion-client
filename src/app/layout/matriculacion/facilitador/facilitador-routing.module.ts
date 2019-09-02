import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FacilitadorComponent} from './facilitador.component';

const routes: Routes = [
  {
    path: '',
    component: FacilitadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitadorRoutingModule {
}





