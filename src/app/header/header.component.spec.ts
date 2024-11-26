import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

import { HeaderComponent } from './header.component';

class MockUserService {}

class MockAuthService {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
