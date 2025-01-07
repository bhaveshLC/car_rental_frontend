import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/AuthService/auth.service';
import { AlertService } from '../../../service/alert/alert.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
    this.authService.handleLogin(username, password).subscribe(
      (res: any) => {
        localStorage.setItem('user', res.token);
        this.alertService.getToast('success', 'Login Successful');
        this.router.navigateByUrl('layout/dashboard');
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
}
