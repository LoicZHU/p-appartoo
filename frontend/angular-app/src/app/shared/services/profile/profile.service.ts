import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _apiUrl: string;
  private readonly friendIds$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private readonly friends$: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  constructor(private readonly _http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {}

  // --- profile
  getById(id: string): Observable<any> {
    return this._http.get(`${this._apiUrl}/profile/${id}`).pipe(
      tap((res) => {
        const friends = res['data']['friends'];
        const friendsIds = friends.map((friend) => friend._id);

        this.friends$.next(friends)
        this.friendIds$.next(friendsIds);
      })
    );
  }

  edit(id: string): Observable<any> {
    return this._http.get(`${this._apiUrl}/profile/${id}/edit`);
  }

  update({ id, age, family, breed, feed }): Observable<any> {
    return this._http.patch(`${this._apiUrl}/profile/${id}/edit`, {
      age,
      family,
      breed,
      feed,
    });
  }

  // --- friends
  getFriendsIds(): BehaviorSubject<string[]> {
    return this.friendIds$;
  }

  getFriends(): BehaviorSubject<any[]> {
    return this.friends$;
  }

  addFriend({ id, friendPangolinId }): Observable<any> {
    return this._http
      .post(`${this._apiUrl}/profile/${id}/add`, {
        id,
        friendPangolinId,
      })
      .pipe(
        tap((res) => {
          const friendsIds = res['data']['friends'];
          this.friendIds$.next(friendsIds);
        })
      );
  }

  removeFriend({ id, friendPangolinId }): Observable<any> {
    return this._http
      .patch(`${this._apiUrl}/profile/${id}/delete`, {
        friendPangolinId,
      })
      .pipe(
        tap((res) => {
          const friendsIds = res['data']['friends'];
          const friends = [...this.friends$.value]
          const friendToRemoveIndex = this.friends$.value.findIndex((friendObj) => friendObj._id == friendPangolinId)
          friends.splice(friendToRemoveIndex, 1)

          this.friendIds$.next(friendsIds);
          this.friends$.next(friends)
        })
      );
  }
}
