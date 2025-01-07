import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../service/Booking/booking.service';
import { CurrencyPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookingService = inject(BookingService);
  alertService = inject(AlertService);
  bookingId: any;
  booking: any;
  cardDetails = new FormGroup({
    name: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['bookingId'];
    console.log(this.bookingId);

    this.bookingService.getBookingDetails(this.bookingId).subscribe((res) => {
      this.booking = res;
    });
  }
  onSubmit() {
    const cardDetailsObj = {
      name: this.cardDetails.controls.name.value,
      cardNumber: this.cardDetails.controls.cardNumber.value,
      expiryDate: this.cardDetails.controls.expiryDate.value,
      cvv: this.cardDetails.controls.cvv.value,
      totalAmount: this.booking.totalPrice,
    };
    console.log(cardDetailsObj);
    this.bookingService.makePayment(this.bookingId, cardDetailsObj).subscribe(
      (res) => {
        this.alertService.getToast('success', 'Payment Successful');
        this.router.navigateByUrl(`layout/my-booking/${this.bookingId}`);
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
  onBack() {
    this.router.navigateByUrl(`layout/my-booking/${this.booking._id}`);
  }
}
