import { Component, inject, OnInit } from '@angular/core';
import { AddSubscriptionComponent } from '../../resuable/add-subscription/add-subscription.component';
import { AuthService } from '../../../service/AuthService/auth.service';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [AddSubscriptionComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent implements OnInit {
  authService = inject(AuthService);
  subscriptionType: string = '';
  token = localStorage.getItem('user') || '';
  user = this.getDecodedAccessToken(this.token);
  selectSubscription(type: string) {
    this.subscriptionType = type;
  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.authService.getUser(this.user._id).subscribe((res) => {
      this.user = res;
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
