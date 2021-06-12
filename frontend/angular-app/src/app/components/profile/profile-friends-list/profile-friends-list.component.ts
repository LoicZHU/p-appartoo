import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-friends-list',
  templateUrl: './profile-friends-list.component.html',
  styleUrls: ['./profile-friends-list.component.scss'],
})
export class ProfileFriendsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  profileId: string;
  friends: any[];
  error: string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _profileService: ProfileService,
    private readonly _authService: AuthService
  ) {
    this.profileId = localStorage.getItem('pangolin_id');
  }

  ngOnInit(): void {
    this.getProfileInformations();
    this.getFriends();
  }

  getProfileInformations(): void {
    this._profileService
      .getById(this.profileId)
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => {
          return (this.error = res['error']);
        }),
        map((res) => res['data'])
      )
      .subscribe();
  }

  getFriends(): void {
    this._profileService
      .getFriends()
      .pipe(takeUntil(this.destroy$))
      .subscribe((friends) => (this.friends = friends));
  }

  removeFriend(friendPangolinId: string): void {
    this._profileService
      .removeFriend({ id: this.profileId, friendPangolinId })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }
}
