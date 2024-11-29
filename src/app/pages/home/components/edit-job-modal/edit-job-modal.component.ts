import { state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { JobApplication } from 'src/types/job-application.type';

@Component({
  selector: 'app-edit-job-modal',
  templateUrl: './edit-job-modal.component.html',
  styleUrls: ['./edit-job-modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('open', style({})),
      state('closed', style({})),
      transition('open => closed', []),
      transition('closed => open', []),
    ]),
  ],
})
export class EditJobModalComponent implements OnInit {
  @Input() job!: JobApplication;

  @Output() closeModal = new EventEmitter<void>();
  @Output() editJob = new EventEmitter<{
    id: string;
    form: FormGroup;
  }>();

  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly toastr: ToastrService,
  ) {
    this.jobForm = this.fb.group({
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      date: new FormControl(
        new Date().toISOString().split('T')[0],
        Validators.required,
      ),
      lastUpdate: new FormControl(
        new Date().toISOString().split('T')[0],
        Validators.required,
      ),
    });
  }

  ngOnInit(): void {
    if (this.job) {
      this.jobForm = this.fb.group({
        company: new FormControl(this.job.company, Validators.required),
        position: new FormControl(this.job.position, Validators.required),
        status: new FormControl(this.job.status, Validators.required),
        date: new FormControl(
          new Date(this.job.date).toISOString().split('T')[0],
          Validators.required,
        ),
        lastUpdate: new FormControl(
          new Date(this.job.lastUpdate).toISOString().split('T')[0],
          Validators.required,
        ),
      });
    }
  }

  onSubmit() {
    if (!this.jobForm.valid) {
      this.toastr.error('Please fill out all required fields');
      return;
    }
    this.editJob.emit({
      id: this.job.id,
      form: this.jobForm,
    });
    this.jobForm.reset();
  }

  onClose() {
    this.closeModal.emit();
  }
}
