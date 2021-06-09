import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuardService} from "./shared/guards/auth-guard/auth-guard.service";
import {LoginGuardService} from "./shared/guards/login-guard/login-guard.service";
import {SignupGuardService} from "./shared/guards/signup-guard/signup-guard.service";

const routes: Routes = [
  {path: 'signup', canLoad: [SignupGuardService], loadChildren: () => import('./components/signup/signup.module').then((m) => m.SignupModule)},
  {path: 'login', canLoad: [LoginGuardService], loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)},
  {path: 'profil', canLoad: [AuthGuardService], loadChildren: () => import('./components/profile/profile.module').then((m) => m.ProfileModule)},
  {path: 'pangolins', canLoad: [AuthGuardService], loadChildren: () => import('./components/pangolins/pangolins.module').then((m) => m.PangolinsModule)},
  {path: '', loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule)},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
