import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel',
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'Unknown status';

    const statusMap: { [key: string]: string } = {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
    };

    return statusMap[value.toLowerCase()] || 'Unknown status';
  }
}
