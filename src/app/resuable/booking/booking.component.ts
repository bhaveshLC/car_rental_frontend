import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../service/Booking/booking.service';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookingService = inject(BookingService);
  alertService = inject(AlertService);
  isValidCoupon: boolean = false;
  discount: number = 0;
  totalDiscountAmount = 0;
  couponMessage: string = '';
  @Input() car: any;
  bookingForm = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    totalPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
    license: new FormControl('', [Validators.required, Validators.min(16)]),
    specialRequests: new FormControl(''),
    couponCode: new FormControl(''),
  });
  carId: string = '';
  token = localStorage.getItem('user')!;
  user = this.getDecodedAccessToken(this.token);
  ngOnInit(): void {
    this.carId = this.route.snapshot.params['carId'];
    console.log(this.user);
  }
  onSubmit() {
    const bookingObj = {
      startDate: this.bookingForm.controls.startDate.value,
      endDate: this.bookingForm.controls.endDate.value,
      totalPrice: this.totalDiscountAmount,
      license: this.bookingForm.controls.license.value,
      specialRequests: this.bookingForm.controls.specialRequests.value,
    };
    if (bookingObj.totalPrice == 0) {
      bookingObj.totalPrice = this.bookingForm.controls.totalPrice.value!;
    }
    this.bookingService.createCarBooking(bookingObj, this.carId).subscribe(
      (res: any) => {
        this.alertService.getToast('success', 'Car booked successfully.');
        this.bookingForm.reset();
        this.discount = 0;
        this.totalDiscountAmount = 0;
        this.couponMessage = '';
        console.log(res);
        this.router.navigateByUrl(`layout/payment/${res._id}`);
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
        console.log(error);

        this.bookingForm.reset();
      }
    );
  }
  onDateChange() {
    const start = this.bookingForm.controls.startDate.value;
    const end = this.bookingForm.controls.endDate.value;

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.bookingForm.patchValue({
        totalPrice: (differenceInDays + 1) * this.car.pricePerDay,
      });
      this.onCouponCodeApply();
    } else {
      console.log('Start or End date is null or undefined');
    }
  }
  onCouponCodeApply() {
    this.bookingService
      .applyCoupon(
        this.bookingForm.controls.totalPrice.value!,
        this.bookingForm.controls.couponCode.value!
      )
      .subscribe(
        (res: any) => {
          this.totalDiscountAmount = res.totalPrice;
          this.discount = res.discount;
          this.isValidCoupon = true;
        },
        (error) => {
          this.isValidCoupon = false;
          this.couponMessage = error.error.message;
        }
      );
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
