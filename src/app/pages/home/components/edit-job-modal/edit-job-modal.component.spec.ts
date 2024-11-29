import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {
  JobApplication,
  JobApplicationStatus,
} from 'src/types/job-application.type';

import { EditJobModalComponent } from './edit-job-modal.component';

describe('EditJobModalComponent', () => {
  let component: EditJobModalComponent;
  let fixture: ComponentFixture<EditJobModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditJobModalComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct values', () => {
    const job: JobApplication = {
      id: '1',
      userId: 'user1', // assuming userId is required
      company: 'Test Company',
      position: 'Engineer',
      status: JobApplicationStatus.pending,
      date: new Date(),
      lastUpdate: new Date(),
    };

    component.job = job;
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.jobForm.value).toEqual({
      company: job.company,
      position: job.position,
      status: job.status,
      date: job.date.toISOString().split('T')[0],
      lastUpdate: job.lastUpdate.toISOString().split('T')[0],
    });
  });

  it('should emit closeModal event when onClose is called', (done) => {
    component.closeModal.subscribe(() => {
      done();
    });
    component.onClose();
  });

  it('should emit editJob event with correct values when onSubmit is called', () => {
    spyOn(component.editJob, 'emit');

    const job: JobApplication = {
      id: '1',
      userId: 'user1', // assuming userId is required
      company: 'Test Company',
      position: 'Engineer',
      status: JobApplicationStatus.pending,
      date: new Date(),
      lastUpdate: new Date(),
    };

    component.job = job;
    component.ngOnInit();
    fixture.detectChanges();

    component.jobForm.setValue({
      company: 'Updated Company',
      position: 'Updated Position',
      status: JobApplicationStatus.accepted,
      date: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
    });

    component.onSubmit();

    expect(component.editJob.emit).toHaveBeenCalledWith({
      id: '1',
      form: component.jobForm,
    });
  });

  it('should show error message if form is invalid', () => {
    spyOn(component['toastr'], 'error').and.callThrough();
    component.jobForm.controls['company'].setValue('');
    component.onSubmit();
    expect(component['toastr'].error).toHaveBeenCalledWith(
      'Please fill out all required fields',
    );
  });
});
