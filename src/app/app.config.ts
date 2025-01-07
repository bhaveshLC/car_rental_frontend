import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authenticationInterceptor } from '../service/interceptors/authentication.interceptor';
import { adminAuthenctionInterceptor } from '../service/interceptors/interceptor/admin-authenction.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authenticationInterceptor, adminAuthenctionInterceptor])
    ),
  ],
};
