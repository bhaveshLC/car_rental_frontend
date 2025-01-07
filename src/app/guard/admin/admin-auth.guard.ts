import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('admin');
  const router = inject(Router);
  if (user) {
    router.navigateByUrl('admin/dashboard');
    return false;
  }
  return true;
};
