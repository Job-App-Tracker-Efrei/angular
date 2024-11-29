import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AddJobModalComponent } from './add-job-modal.component';

describe('AddJobModalComponent', () => {
  let component: AddJobModalComponent;
  let fixture: ComponentFixture<AddJobModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobModalComponent],
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
    fixture = TestBed.createComponent(AddJobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.jobForm.value).toEqual({
      company: '',
      position: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    });
  });

  it('should emit closeModal event when onClose is called', (done) => {
    component.closeModal.subscribe(() => {
      done();
    });
    component.onClose();
  });

  it('should emit addJob event with form values when onSubmit is called', () => {
    spyOn(component.addJob, 'emit');

    component.jobForm.setValue({
      company: 'New Company',
      position: 'New Position',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    });

    component.onSubmit();

    expect(component.addJob.emit).toHaveBeenCalledWith(component.jobForm);
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
