import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FacilitadorRoutingModule} from './facilitador-routing.module';
import {FacilitadorComponent} from './facilitador.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [CommonModule, FacilitadorRoutingModule, FormsModule, PdfViewerModule],
  declarations: [FacilitadorComponent]
})
export class FacilitadorModule {
}
