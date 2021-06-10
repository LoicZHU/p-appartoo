import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string;
  private readonly accessTokenKey: string = 'access_token';
  private readonly currentPangolinIdKey: string = 'pangolin_id';
  private readonly _isAuthenticated$ = new BehaviorSubject(false);

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
    this.apiUrl = environment.apiUrl;
    this.setToken(this.getToken());
  }

  // --- login / logout
  login({ email, password }): Observable<object> {
    return this._http.post(`${this.apiUrl}/login`, {
      email,
      password,
    }) as Observable<object>;
  }

  logout(): void {
    this.setToken(null);
    this._isAuthenticated$.next(false);
    localStorage.removeItem(this.currentPangolinIdKey);
    this._router.navigate(['/login']);
  }

  // --- authenticated
  getAuthenticated(): boolean {
    return this._isAuthenticated$.value;
  }

  getAuthenticated$(): BehaviorSubject<boolean> {
    return this._isAuthenticated$;
  }

  setAuthenticated(value: boolean) {
    this._isAuthenticated$.next(value);
  }

  // --- token
  setToken(token: string | null): void {
    if (!token) {
      localStorage.removeItem(this.accessTokenKey);
      this._isAuthenticated$.next(false);
    } else {
      localStorage.setItem(this.accessTokenKey, token);
      this._isAuthenticated$.next(true);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  deleteToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    this.setAuthenticated(false);
  }

  // --- current pangolin ID
  setCurrentPangolinId(id: string) {
    !id
      ? localStorage.removeItem(this.currentPangolinIdKey)
      : localStorage.setItem(this.currentPangolinIdKey, id);
  }
}
