import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PangolinsComponent } from './pangolins.component';
import { PangolinDetailsComponent } from './pangolin-details/pangolin-details.component';
import { PangolinsListComponent } from './pangolins-list/pangolins-list.component';

const routes: Routes = [
  {
    path: '',
    component: PangolinsComponent,
    children: [
      { path: ':pangolinName', component: PangolinDetailsComponent },
      { path: '', component: PangolinsListComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PangolinsRoutingModule {}
