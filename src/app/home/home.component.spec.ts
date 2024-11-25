import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { HomeComponent } from './home.component';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, FooterComponent],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
