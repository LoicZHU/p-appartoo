import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileFriendsListComponent } from './profile-friends-list/profile-friends-list.component';

const routes: Routes = [
  { path: 'edit', component: ProfileEditComponent },
  { path: 'amis', component: ProfileFriendsListComponent },
  { path: '', redirectTo: 'edit', pathMatch: 'full' },
  { path: '**', component: ProfileEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
