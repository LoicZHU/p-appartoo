import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _apiUrl: string;

  constructor(private readonly _http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {}

  getById(id: string) {
    return this._http.get(`${this._apiUrl}/profile/${id}`);
  }

  edit(id: string) {
    return this._http.get(`${this._apiUrl}/profile/${id}/edit`);
  }

  update({ id, age, family, breed, feed }) {
    return this._http.patch(`${this._apiUrl}/profile/${id}/edit`, {
      age,
      family,
      breed,
      feed,
    });
  }

  addFriend({ id, friendPangolinId }) {
    return this._http.post(`${this._apiUrl}/profile/${id}/add`, {
      id,
      friendPangolinId,
    });
  }

  removeFriend({ id, friendPangolinId }) {
    return this._http.patch(`${this._apiUrl}/profile/${id}/add`, {
      friendPangolinId,
    });
  }
}
