import { AlertService } from './../../../../service/alert/alert.service';
import { Component, inject } from '@angular/core';
import { CancelComponent } from '../../../resuable/Cancel/cancel/cancel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../../service/Booking/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-information',
  standalone: true,
  imports: [CommonModule, CancelComponent],
  templateUrl: './booking-information.component.html',
  styleUrl: './booking-information.component.css',
})
export class BookingInformationComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookingService = inject(BookingService);
  alertService = inject(AlertService);
  booking: any;
  bookingId: string = '';
  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['id'];
    this.getBooking();
  }
  getBooking() {
    this.bookingService.getBookingDetails(this.bookingId).subscribe((res) => {
      this.booking = res;
      console.log(res);
    });
  }
  onConfirm() {
    this.bookingService.confirmBooking(this.bookingId).subscribe(
      (res) => {
        this.alertService.getToast('success', 'order confirmed');
        this.getBooking();
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
  onCancel() {
    const cancel = confirm('Are you sure?');
    if (cancel) {
      this.bookingService
        .cancelBooking(this.bookingId, 'Admin cancelled your booking')
        .subscribe(
          (res) => {
            alert('Booking cancelled Successfully');
          },
          (error) => {
            console.log(error.error.message);
          }
        );
    }
  }
}
