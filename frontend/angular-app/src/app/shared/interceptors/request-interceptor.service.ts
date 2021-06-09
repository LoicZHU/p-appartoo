import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${this._authService.getToken()}`,
      },
    });

    return next.handle(req).pipe(
      catchError((err, caught) => {
        if (err.status == 401) {
          this.handleAuthError();
          return of(err);
        } else {
          throw err;
        }
      })
    );
  }

  private handleAuthError() {
    this._authService.deleteToken()
    this._router.navigateByUrl('login');
  }
}
