import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { JobApplicationStatus } from 'src/types/job-application.type';

@Directive({
  selector: '[appJobStatus]',
})
export class JobStatusDirective implements OnChanges {
  @Input() appJobStatus: JobApplicationStatus = JobApplicationStatus.pending;
  private appliedClass: string | null = null;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes['appJobStatus']) {
      this.applyStatusClass();
    }
  }

  private applyStatusClass(): void {
    if (this.appliedClass) {
      const previousClasses = this.appliedClass.split(' ');
      previousClasses.forEach((cls) =>
        this.renderer.removeClass(this.el.nativeElement, cls),
      );
    }

    const statusClass = this.getStatusClass(this.appJobStatus);

    if (statusClass) {
      const newClasses = statusClass.split(' ');
      newClasses.forEach((cls) =>
        this.renderer.addClass(this.el.nativeElement, cls),
      );
      this.appliedClass = statusClass;
    } else {
      this.appliedClass = null;
    }
  }

  private getStatusClass(status: JobApplicationStatus): string | null {
    switch (status.toLowerCase()) {
      case JobApplicationStatus.pending:
        return 'bg-yellow-100 text-yellow-600';
      case JobApplicationStatus.rejected:
        return 'bg-red-100 text-red-600';
      case JobApplicationStatus.accepted:
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}
