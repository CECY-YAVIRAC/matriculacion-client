import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RolRoutingModule} from './rol-routing.module';
import {RolComponent} from './rol.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [CommonModule, RolRoutingModule, FormsModule, PdfViewerModule],
  declarations: [RolComponent]
})
export class RolModule {
}
