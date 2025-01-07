import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../service/AuthService/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../../service/alert/alert.service';

@Component({
  selector: 'app-admin-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './admin-registration.component.html',
  styleUrl: './admin-registration.component.css',
})
export class AdminRegistrationComponent {
  authService = inject(AuthService);
  router = inject(Router);
  alertService = inject(AlertService);
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });
  onRegister() {
    const registrationObj = {
      name: this.registerForm.controls.name.value,
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      phoneNumber: this.registerForm.controls.phoneNumber.value,
    };
    this.authService.createAdmin(registrationObj).subscribe(
      (res) => {
        this.alertService.getToast('success', 'User created Successfully.');
        this.router.navigateByUrl('admin/login');
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
}
