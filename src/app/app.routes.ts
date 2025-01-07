import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CarsComponent } from './pages/cars/cars.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { authenticationGuard } from './guard/Authentication/authentication.guard';
import { authGuard } from './guard/Auth/auth.guard';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MyCarsComponent } from './pages/admin/my-cars/my-cars.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CarInformationComponent } from './pages/admin/car-information/car-information.component';
import { BookingManagerComponent } from './pages/admin/booking-manager/booking-manager.component';
import { BookingInformationComponent } from './pages/admin/bookind-information/booking-information.component';
import { PaymentDetailsComponent } from './pages/admin/payment-details/payment-details.component';
import { AboutComponent } from './pages/about/about.component';
import { adminAuthGuard } from './guard/admin/admin-auth.guard';
import { adminAuthentiactionGuard } from './guard/admin/admin-authentiaction.guard';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminRegistrationComponent } from './pages/admin/admin-registration/admin-registration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'my-booking/:id',
        component: BookingDetailsComponent,
      },
      {
        path: 'cars',
        component: CarsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'my-booking',
        component: MyBookingComponent,
      },
      {
        path: 'about-us',
        component: AboutComponent,
      },
      {
        path: 'cars/:carId',
        component: CarDetailsComponent,
      },
      {
        path: 'payment/:bookingId',
        component: PaymentComponent,
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/register',
    component: AdminRegistrationComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminAuthentiactionGuard],
    children: [
      { path: 'my-cars', component: MyCarsComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'bookings', component: BookingManagerComponent },
      { path: 'car-details/:id', component: CarInformationComponent },
      { path: 'booking/:id', component: BookingInformationComponent },
      { path: 'transaction', component: PaymentDetailsComponent },
      {
        path: 'profile',
        component: AdminProfileComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
