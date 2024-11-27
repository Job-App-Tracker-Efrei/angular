import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string | null, format: string = 'longDate'): string {
    if (!value) return 'Date is missing';
    const userLocale = navigator.language || 'en-US';
    const datePipe = new DatePipe(userLocale);
    return datePipe.transform(value, format) ?? 'Invalid date';
  }
}
