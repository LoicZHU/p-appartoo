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
  profileFriends;

  constructor(
    private readonly _pangolinsService: PangolinsService,
    private readonly _profileService: ProfileService
  ) {
    this.profileId = localStorage.getItem('pangolin_id');
  }

  ngOnInit(): void {
    this.getAllPangolins();
    this.getProfile(this.profileId);
  }

  getAllPangolins() {
    this.pangolins$ = this._pangolinsService.getAll().pipe(
      takeUntil(this.destroy$),
      tap((res) => (this.error = res['error'])),
      map((res) => res['data'])
    );
  }

  getProfile(id: string) {
    this.profileFriends = this._profileService
      .getById(id)
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => console.log('tap get profile', res)),
        map((res) => res['data']['friends'])
      )
      .subscribe();
  }

  addFriend(friendPangolinId: string) {
    console.log('add friend', friendPangolinId);

    this._profileService
      .addFriend({ id: this.profileId, friendPangolinId })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  removeFriend(friendPangolinId: string) {
    console.log('remove friend', friendPangolinId);

    this._profileService
      .removeFriend({ id: this.profileId, friendPangolinId })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
