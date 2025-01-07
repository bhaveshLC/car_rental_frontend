import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  const router = inject(Router);
  if (user) {
    router.navigateByUrl('layout/dashboard');
    return false;
  }
  return true;
};
