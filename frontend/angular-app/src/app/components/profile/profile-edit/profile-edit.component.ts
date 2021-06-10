import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../shared/services/profile/profile.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  families: string[] = ['Eomanidae', 'Patriomanidae', 'Manidae'];
  breeds: string[] = [
    'Pangolin malais',
    'Pangolin de Chine',
    'Pangolin indien',
    'Pangolin des Philippines',
    'Pangolin géant',
    'Pangolin du Cap',
    'Pangolin à longue queue',
    'Pangolin à petites écailles',
  ];
  feeds: string[] = ['Insecte', 'Kebap', 'Pizza', 'Salade'];
  currentPangolinId: string;
  form: FormGroup;
  profileData;
  error: string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _profileService: ProfileService,
    private readonly _authService: AuthService
  ) {
    this.currentPangolinId = localStorage.getItem('pangolin_id');
  }

  ngOnInit(): void {
    this.initForm();
    this.getProfileInformations();
  }

  getProfileInformations() {
    this.profileData = this._profileService
      .edit(this.currentPangolinId)
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => (this.error = res['error'])),
        map((res) => res['data'])
      )
      .subscribe((data) => {
        if (!data) {
          return;
        } else {
          const { age, breed, family, feed } = data;
          this.form.setValue({ age, breed, family, feed });
        }
      });
  }

  initForm() {
    this.form = this._fb.group({
      age: this._fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(999),
      ]),
      family: this._fb.control('', Validators.required),
      breed: this._fb.control('', Validators.required),
      feed: this._fb.control('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      this.updateProfile();
    }
  }

  updateProfile() {
    const age = +this.form.get('age').value;
    this.form.patchValue({ age: age });

    this._profileService
      .update({
        id: this.currentPangolinId,
        ...this.form.value,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }
}
