import { TestBed } from '@angular/core/testing';

import { SignupGuardService } from './signup-guard.service';

describe('SignupGuardService', () => {
  let service: SignupGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
