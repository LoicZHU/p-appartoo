import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFriendsListComponent } from './profile-friends-list.component';

describe('ProfileFriendsListComponent', () => {
  let component: ProfileFriendsListComponent;
  let fixture: ComponentFixture<ProfileFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
