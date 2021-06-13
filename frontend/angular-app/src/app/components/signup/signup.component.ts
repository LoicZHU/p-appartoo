import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../shared/services/signup/signup.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PangolinsService } from '../../shared/services/pangolins/pangolins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('pangolinNameInput') pangolinNameInput;
  @ViewChild('emailInput') emailInput;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;
  readonly passwordMinLength: number = 8;
  emailAvailable: boolean = true;
  usernameAvailable: boolean = true;
  readonly checkUsername = new Subject<string>();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _signupService: SignupService,
    private readonly _pangolinsService: PangolinsService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const lettersAndNumbersRegex = /^[a-zA-Z0-9]+$/;

    this.form = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
      ]),
      pangolinName: this._fb.control('', [
        Validators.required,
        Validators.pattern(lettersAndNumbersRegex),
      ]),
    });

    // --- check availability
    this.form
      .get('email')
      .valueChanges.pipe(
        debounceTime(400),
        filter((value) => Boolean(value.trim())),
        map((value: any) => String(value).toLowerCase().trim()),
        switchMap((value) =>
          this._signupService.getPropertyAvailability({
            property: 'email',
            value,
          })
        )
      )
      .subscribe((res) => {
        const isAvailable = res['available'];
        this.emailAvailable = isAvailable;

        if (isAvailable === true) {
          return;
        } else {
          this.form.get('email').setErrors({ incorrect: true });
        }
      });

    this.form
      .get('pangolinName')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => Boolean(value.trim())),
        map((value: any) => String(value).trim().toLowerCase()),
        tap((v) => console.log('v', v)),
        switchMap((value) =>
          this._signupService.getPropertyAvailability({
            property: 'pangolinName',
            value,
          })
        )
      )
      .subscribe((res) => {
        const isAvailable = res['available'];
        this.usernameAvailable = isAvailable;

        if (isAvailable === true) {
          return;
        } else {
          this.form.get('pangolinName').setErrors({ incorrect: true });
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    } else {
      this._signupService
        .signup(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this._router.navigate(['login']));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
