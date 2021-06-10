import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanLoad {
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
      return true;
    } else {
      this._router.navigate(['']);
      return false;
    }
  }
}
