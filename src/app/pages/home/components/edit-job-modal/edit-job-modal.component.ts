import { state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {
  JobApplication,
  JobApplicationStatus,
} from 'src/types/job-application.type';

@Component({
  selector: 'app-edit-job-modal',
  templateUrl: './edit-job-modal.component.html',
  styleUrls: ['./edit-job-modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('open', style({})),
      state('closed', style({})),
      transition('open <=> closed', []),
    ]),
  ],
})
export class EditJobModalComponent implements OnInit {
  @Input() job!: JobApplication;
  @Output() closeModal = new EventEmitter<void>();
  @Output() editJob = new EventEmitter<{ id: string; form: FormGroup }>();

  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly toastr: ToastrService,
  ) {
    this.jobForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.job) {
      this.jobForm.setValue(this.jobToFormValues(this.job));
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      status: ['', Validators.required],
      date: [this.today(), Validators.required],
      lastUpdate: [this.today(), Validators.required],
    });
  }

  private today(): string {
    return new Date().toISOString().split('T')[0];
  }

  private jobToFormValues(job: JobApplication): {
    company: string;
    position: string;
    status: JobApplicationStatus;
    date: string;
    lastUpdate: string;
  } {
    return {
      company: job.company,
      position: job.position,
      status: job.status,
      date: new Date(job.date).toISOString().split('T')[0],
      lastUpdate: new Date(job.lastUpdate).toISOString().split('T')[0],
    };
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.toastr.error('Please fill out all required fields');
      return;
    }

    this.editJob.emit({
      id: this.job.id,
      form: this.jobForm,
    });

    this.jobForm.reset();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
