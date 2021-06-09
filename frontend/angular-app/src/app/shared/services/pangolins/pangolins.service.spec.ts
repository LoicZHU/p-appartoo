import { TestBed } from '@angular/core/testing';

import { PangolinsService } from './pangolins.service';

describe('PangolinsService', () => {
  let service: PangolinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PangolinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
