import { AbstractControl, ValidatorFn } from '@angular/forms';

import { isValidEmail } from '@utils/checkData/isValidEmail';

export function emailValidator(): ValidatorFn {
  return (
    control: AbstractControl<string>,
  ): { [key: string]: unknown } | null => {
    if (!control.value) return null;
    return isValidEmail(control.value) ? null : { email: true };
  };
}
