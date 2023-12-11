import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountViewComponent } from './user-account-view.component';

describe('UserAccountViewComponent', () => {
  let component: UserAccountViewComponent;
  let fixture: ComponentFixture<UserAccountViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAccountViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
