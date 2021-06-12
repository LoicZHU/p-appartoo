import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../shared/services/signup/signup.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { PangolinsService } from '../../shared/services/pangolins/pangolins.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('pangolinName') pangolinNameInput;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  readonly passwordMinLength: number = 8;
  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _signupService: SignupService,
    private readonly _pangolinsService: PangolinsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  checkPangolinNameExists() {
    const pangolinNameInputEl = this.getNativeElement(this.pangolinNameInput);
    const pangolinName$ = fromEvent(pangolinNameInputEl, 'keyup')
      .pipe(
        tap(() => console.log('tap'))
        // map((e) => console.log('mape', e))
      )
      .subscribe(() => {
        console.log('subs');
      });

    console.log(this.pangolinNameInput);
  }

  getNativeElement(el): void {
    return el._elementRef.nativeElement;
  }

  initForm(): void {
    this.form = this._fb.group({
      email: this._fb.control('', [Validators.required, Validators.email]),
      password: this._fb.control('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
      ]),
      // pangolinName: this._fb.control('', [Validators.required]),
    });

    // this.form.get('pangolinName').valueChanges
    //   .pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //     map((value: any) => String(value).toLowerCase().trim()),
    //     switchMap((pangolinName) => {
    //       console.log('switchMap0', pangolinName)
    //       return this._pangolinsService.getByPangolinName(pangolinName)
    //     }),
    //   )
    //   .subscribe(
    //     xx => console.log('sub', xx),
    //     err => console.log('err!!!!', err)
    //   )
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
