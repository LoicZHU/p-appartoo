import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';
import {DirectivesModule} from "../../shared/modules/directives/directives.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FooterModule,
    DirectivesModule,
  ],
})
export class LoginModule {}
