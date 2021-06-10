import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private readonly _apiUrl: string;

  constructor(private readonly _http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  signup({ email, password, pangolinName }) {
    return this._http.post(`${this._apiUrl}/signup`, {
      email,
      password,
      pangolinName,
    }) as Observable<object>;
  }
}
