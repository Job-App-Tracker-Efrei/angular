import { state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('open', style({})), // Style is defined by your CSS
      state('closed', style({})),
      transition('open => closed', []), // CSS handles the animations
      transition('closed => open', []),
    ]),
  ],
})
export class AddJobModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addJob = new EventEmitter<FormGroup>();

  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly toastr: ToastrService,
  ) {
    this.jobForm = this.fb.group({
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      status: new FormControl('pending', Validators.required),
      date: new FormControl(
        new Date().toISOString().split('T')[0],
        Validators.required,
      ),
    });
  }

  onSubmit() {
    if (!this.jobForm.valid) {
      this.toastr.error('Please fill out all required fields');
      return;
    }
    this.addJob.emit(this.jobForm);
    this.jobForm.reset();
  }

  onClose() {
    this.closeModal.emit();
  }
}
