import { AlertService } from './../../../../service/alert/alert.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../service/AuthService/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  alertService = inject(AlertService);
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onLogin() {
    const username = this.loginForm.controls.username.value!;
    const password = this.loginForm.controls.password.value!;
    this.authService.handleAdminLogin(username, password).subscribe(
      (res: any) => {
        localStorage.setItem('admin', res.token);
        this.alertService.getToast('success', 'Admin Login Successful');
        this.router.navigateByUrl('admin/dashboard');
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
}
