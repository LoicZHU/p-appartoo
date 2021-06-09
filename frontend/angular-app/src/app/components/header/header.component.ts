import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAuthenticated: boolean;

  routes: Array<{ path: string; label: string }> = [
    { path: '/', label: 'Accueil' },
    { path: '/pangolins', label: 'Pangolins' },
  ];

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.getAuthentificated();
    this.start();
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent): void {
    if (event.storageArea != localStorage) {
      return;
    } else {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        return;
      } else {
        this._authService.setAuthenticated(false);
      }
    }
  }

  getAuthentificated(): void {
    this._authService
      .getAuthenticated$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.isAuthenticated = value));
  }

  onSignupClick(): void {
    this._router.navigate(['signup']);
  }

  onLoginClick(): void {
    this._router.navigate(['login']);
  }

  onLogoutClick(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }
}
