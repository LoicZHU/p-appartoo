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
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PangolinsService } from '../../shared/services/pangolins/pangolins.service';

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
    private readonly _pangolinsService: PangolinsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
      ]),
      pangolinName: this._fb.control('', [Validators.required]),
    });

    this.form
      .get('email')
      .valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter((value) => Boolean(value.trim())),
        map((value: any) => String(value).toLowerCase().trim()),
        switchMap((value) =>
          this._signupService.getPropertyAvailability({
            property: 'email',
            value,
          })
        )
      )
      .subscribe((res) => (this.emailAvailable = res['available']));

    this.form
      .get('pangolinName')
      .valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter((value) => Boolean(value.trim())),
        map((value: any) => String(value).trim().toLowerCase()),
        switchMap((value) =>
          this._signupService.getPropertyAvailability({
            property: 'pangolinName',
            value,
          })
        )
      )
      .subscribe((res) => (this.usernameAvailable = res['available']));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    } else {
      this._signupService
        .signup(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
