import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthentiactionGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('admin');
  const router = inject(Router);
  if (!user) {
    router.navigateByUrl('admin/login');
    return false;
  }
  return true;
};
