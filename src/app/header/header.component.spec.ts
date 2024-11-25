import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { HeaderComponent } from './header.component';

import { AuthService } from '../core/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        AuthService, // Provide the AuthService used in the component
        {
          provide: FIREBASE_OPTIONS, // Provide mock Firebase configuration
          useValue: {
            apiKey: 'test-api-key',
            authDomain: 'test-project.firebaseapp.com',
            projectId: 'test-project',
            storageBucket: 'test-project.appspot.com',
            messagingSenderId: 'test-id',
            appId: 'test-app-id',
          },
        },
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
