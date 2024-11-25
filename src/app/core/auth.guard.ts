// Create a guard that will check if the user is logged in or not. If the user is not logged in, it will redirect the user to the login page.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../core/user.service';

export const AuthGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const router = inject(Router);

  try {
    await userService.getCurrentUser();
    return true;
  } catch {
    router.navigate(['/login']);
    return false;
  }
};
