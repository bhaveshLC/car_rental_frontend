import { Component, inject } from '@angular/core';
import { EditProfileComponent } from '../../../resuable/edit-profile/edit-profile.component';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../../../service/AuthService/auth.service';
import { LoaderComponent } from '../../../resuable/loader/loader.component';
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [EditProfileComponent, LoaderComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css',
})
export class AdminProfileComponent {
  isLoading: boolean = false;
  personalData: any;
  token = localStorage.getItem('admin');
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
      console.log('personalData', this.personalData);
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
