import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.scss'],
})
export class AddJobModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addJob = new EventEmitter<FormGroup>();

  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      company: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
    });
  }

  onSubmit() {
    this.addJob.emit(this.jobForm);
    if (this.jobForm.valid) {
      this.jobForm.reset();
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
