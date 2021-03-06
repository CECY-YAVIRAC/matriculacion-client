import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCarouselModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {DashboardCupoRoutingModule} from './dashboard-cupo-routing.module';
import {DashboardCupoComponent} from './dashboard-cupo.component';

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    DashboardCupoRoutingModule
  ],
  declarations: [
    DashboardCupoComponent
  ]
})
export class DashboardCupoModule {
}
