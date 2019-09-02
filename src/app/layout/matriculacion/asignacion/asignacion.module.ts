import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AsignacionRoutingModule} from './asignacion-routing.module';
import {AsignacionComponent} from './asignacion.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [CommonModule, AsignacionRoutingModule, FormsModule, PdfViewerModule],
  declarations: [AsignacionComponent]
})
export class AsignacionModule {
}
