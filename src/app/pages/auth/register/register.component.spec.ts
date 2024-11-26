import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';

import { RegisterComponent } from './register.component';

class MockAuthService {}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
