import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _apiUrl: string;
  private friendIds$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

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
  getFriends(): BehaviorSubject<string[]> {
    return this.friendIds$;
  }

  addFriend({ id, friendPangolinId }): Observable<any> {
    return this._http
      .post(`${this._apiUrl}/profile/${id}/add`, {
        id,
        friendPangolinId,
      })
      .pipe(
        tap((res) => {
          const friends = res['data']['friends'];
          this.friendIds$.next(friends);
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
          const friends = res['data']['friends'];
          this.friendIds$.next(friends);
        })
      );
  }
}
