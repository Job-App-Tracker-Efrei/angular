import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import {
  type JobApplication,
  JobApplicationStatus,
} from 'src/types/job-application.type';

@Component({
  selector: 'app-job-application-table',
  templateUrl: './job-application-table.component.html',
})
export class JobApplicationTableComponent {
  JobApplicationStatus = JobApplicationStatus;

  @Input() jobApplications: JobApplication[] = [];
  @Output() updateJobApplication = new EventEmitter<string>();
  @Output() deleteJobApplication = new EventEmitter<string>();

  constructor(private readonly router: Router) {}

  onEdit(id: string): void {
    this.updateJobApplication.emit(id);
  }

  onDelete(id: string): void {
    this.deleteJobApplication.emit(id);
  }

  onView(id: string): void {
    this.router.navigate(['/job-application', id]);
  }
}
