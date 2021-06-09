import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PangolinsRoutingModule } from './pangolins-routing.module';
import { PangolinsComponent } from './pangolins.component';
import { PangolinsListComponent } from './pangolins-list/pangolins-list.component';
import {HeaderModule} from "../header/header.module";


@NgModule({
  declarations: [PangolinsComponent, PangolinsListComponent],
  imports: [CommonModule, PangolinsRoutingModule, HeaderModule],
})
export class PangolinsModule {}
