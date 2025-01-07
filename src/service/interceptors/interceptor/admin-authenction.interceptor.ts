import { HttpInterceptorFn } from '@angular/common/http';

export const adminAuthenctionInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('admin');
  const cloneRequest = req.clone({
    setHeaders: {
      'admin-Authorization': `Bearer ${token}`,
    },
  });
  return next(cloneRequest);
};
