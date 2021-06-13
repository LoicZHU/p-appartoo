import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PangolinsService {
  private readonly _apiUrl: string;

  constructor(private readonly _http: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  getAll(): Observable<any> {
    return this._http.get(`${this._apiUrl}/pangolins`) as Observable<any>;
  }
}
