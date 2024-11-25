// Create a guard that will check if the user is logged in or not. If the user is not logged in, it will redirect the user to the login page.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LOGIN } from '@constants/routes';

import { UserService } from '../core/user.service';

export const AuthGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const router = inject(Router);

  try {
    const user = await userService.getCurrentUser();
    if (!user) {
      router.navigate([LOGIN]);
      return false;
    }
    return true;
  } catch (_error) {
    router.navigate([LOGIN]);
    return false;
  }
};
