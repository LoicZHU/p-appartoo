import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';
import {DirectivesModule} from "../../shared/modules/directives/directives.module";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FooterModule,
    DirectivesModule,
  ],
})
export class SignupModule {}
