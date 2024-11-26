import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';

import { LoginComponent } from './login.component';

class MockAuthService {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
