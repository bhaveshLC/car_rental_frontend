import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../service/AuthService/auth.service';
import { CurrencyPipe } from '@angular/common';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-add-subscription',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './add-subscription.component.html',
  styleUrl: './add-subscription.component.css',
})
export class AddSubscriptionComponent {
  @Input() subscriptionType: string = '';
  @Input() subscriptionAmount: any;
  @Output() getUser: EventEmitter<void> = new EventEmitter();
  authService = inject(AuthService);
  alertService = inject(AlertService);
  cardDetails = new FormGroup({
    name: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
  });
  onSubmit() {
    const cardDetailsObj = {
      name: this.cardDetails.controls.name.value,
      cardNumber: this.cardDetails.controls.cardNumber.value,
      expiryDate: this.cardDetails.controls.expiryDate.value,
      cvv: this.cardDetails.controls.cvv.value,
    };
    this.authService.handleSubscription(cardDetailsObj).subscribe(
      (res) => {
        this.alertService.getToast('success', 'Subscription added');
        this.getUser.emit();
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
}
