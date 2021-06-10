import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HeaderModule } from '../header/header.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
})
export class ProfileModule {}
