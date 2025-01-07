import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from '../../resuable/loader/loader.component';
import * as jwt_decode from 'jwt-decode';
import { EditProfileComponent } from '../../resuable/edit-profile/edit-profile.component';
import { AuthService } from '../../../service/AuthService/auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  personalData: any;
  token = localStorage.getItem('user');
  authService = inject(AuthService);
  user: any;
  ngOnInit(): void {
    this.user = this.getDecodedAccessToken(this.token!);
    this.getUserDetails();
  }
  getUserDetails() {
    this.isLoading = true;
    this.authService.getUser(this.user._id).subscribe((res) => {
      this.personalData = res;
      this.isLoading = false;
    });
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
