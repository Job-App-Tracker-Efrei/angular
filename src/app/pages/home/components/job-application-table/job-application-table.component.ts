import { Component, Input } from '@angular/core';

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
}
