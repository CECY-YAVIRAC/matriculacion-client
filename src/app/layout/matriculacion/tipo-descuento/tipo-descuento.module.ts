import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TipoDescuentoRoutingModule} from './tipo-descuento-routing.module';
import {TipoDescuentoComponent} from './tipo-descuento.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [CommonModule, TipoDescuentoRoutingModule, FormsModule, PdfViewerModule],
  declarations: [TipoDescuentoComponent]
})
export class TipoDescuentoModule {
}
