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

  signup({ email, password, pangolinName }): Observable<any> {
    return this._http.post(`${this._apiUrl}/signup`, {
      email,
      password,
      pangolinName,
    }) as Observable<any>;
  }

  getPropertyAvailability({ value, property }): Observable<any> {
    return this._http.get(
      `${this._apiUrl}/signup/${property}/${value}`
    ) as Observable<any>;
  }
}
