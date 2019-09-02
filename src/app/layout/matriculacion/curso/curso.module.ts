import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CursoRoutingModule} from './curso-routing.module';
import {CursoComponent} from './curso.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  imports: [CommonModule, CursoRoutingModule, FormsModule, PdfViewerModule],
  declarations: [CursoComponent]
})
export class CursoModule {
}
