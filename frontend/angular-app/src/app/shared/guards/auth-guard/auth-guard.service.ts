import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanLoad {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthentificated();
  }

  checkAuthentificated():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this._authService.getAuthenticated()) {
      this._router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
