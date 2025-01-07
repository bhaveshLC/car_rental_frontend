import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../../service/Booking/booking.service';
import { CommonModule, DatePipe } from '@angular/common';
import { CancelComponent } from '../../resuable/Cancel/cancel/cancel.component';
import { LoaderComponent } from '../../resuable/loader/loader.component';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CancelComponent,
    LoaderComponent,
    RouterLink,
  ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css',
})
export class BookingDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookingService = inject(BookingService);
  booking: any;
  bookingId: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['id'];
    this.getBooking();
    console.log(this.bookingId);
  }
  getBooking() {
    this.isLoading = true;
    this.bookingService.getBookingDetails(this.bookingId).subscribe((res) => {
      this.booking = res;
      this.isLoading = false;
    });
  }
  onMakePayment() {
    this.router.navigateByUrl(`layout/payment/${this.booking._id}`);
  }
}
