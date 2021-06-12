import { Component, OnDestroy, OnInit } from '@angular/core';
import { PangolinsService } from '../../../shared/services/pangolins/pangolins.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ProfileService } from '../../../shared/services/profile/profile.service';

@Component({
  selector: 'app-pangolins-list',
  templateUrl: './pangolins-list.component.html',
  styleUrls: ['./pangolins-list.component.scss'],
})
export class PangolinsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  pangolins$: Observable<any>;
  error: string;
  profileId: string;
  profileFriends: string[] = [];

  constructor(
    private readonly _pangolinsService: PangolinsService,
    private readonly _profileService: ProfileService
  ) {
    this.profileId = localStorage.getItem('pangolin_id');
  }

  ngOnInit(): void {
    this.getAllPangolins();
    this.getProfile(this.profileId);
    this.subscribeToFriendsProfile();
  }

  subscribeToFriendsProfile(): void {
    this._profileService
      .getFriends()
      .pipe(
        takeUntil(this.destroy$),
        map((res) => res)
      )
      .subscribe((friends) => (this.profileFriends = [...friends]));
  }

  getAllPangolins(): void {
    this.pangolins$ = this._pangolinsService.getAll().pipe(
      takeUntil(this.destroy$),
      tap((res) => (this.error = res['error'])),
      map((res) => res['data'])
    );
  }

  getProfile(id: string): void {
    this._profileService
      .getById(id)
      .pipe(
        takeUntil(this.destroy$),
        map((res) => res['data']['friends'])
      )
      .subscribe();
  }

  addFriend(friendPangolinId: string): void {
    const friendIdInProfileFriends =
      this.profileFriends.includes(friendPangolinId);

    if (friendIdInProfileFriends) {
      return;
    } else {
      this._profileService
        .addFriend({ id: this.profileId, friendPangolinId })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  removeFriend(friendPangolinId: string): void {
    const friendIdInProfileFriends =
      this.profileFriends.includes(friendPangolinId);

    if (!friendIdInProfileFriends) {
      return;
    } else {
      this._profileService
        .removeFriend({ id: this.profileId, friendPangolinId })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
