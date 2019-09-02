import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
