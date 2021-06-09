import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinsComponent } from './pangolins.component';

describe('PangolinsComponent', () => {
  let component: PangolinsComponent;
  let fixture: ComponentFixture<PangolinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PangolinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
