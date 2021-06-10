import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.login();
    }
  }

  login() {
    this._authService
      .login(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this._authService.setToken(res['access_token']);
        this._authService.setCurrentPangolinId(res['pangolinId']);
        this._router.navigate(['']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
