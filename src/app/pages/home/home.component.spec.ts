import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

import { JobApplicationTableComponent } from './components/job-application-table/job-application-table.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { HomeComponent } from './home.component';

import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';

class MockAuthService {}

class MockUserService {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        MetricsComponent,
        JobApplicationTableComponent,
      ],
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
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: ToastrService, useValue: {} },
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
