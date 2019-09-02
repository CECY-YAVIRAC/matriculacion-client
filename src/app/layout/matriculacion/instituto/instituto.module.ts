import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InstitutoRoutingModule} from './instituto-routing.module';
import {InstitutoComponent} from './instituto.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [CommonModule, InstitutoRoutingModule, FormsModule, PdfViewerModule],
  declarations: [InstitutoComponent]
})
export class InstitutoModule {
}
