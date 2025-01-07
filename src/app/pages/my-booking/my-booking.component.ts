import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../../service/Booking/booking.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../resuable/time-ago.pipe';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../resuable/loader/loader.component';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [CommonModule, DatePipe, TimeAgoPipe, LoaderComponent],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css',
})
export class MyBookingComponent implements OnInit {
  bookingService = inject(BookingService);
  bookingArr: any[] = [];
  isLoading: boolean = false;
  router = inject(Router);
  bookingStatus: string = 'pending';
  ngOnInit(): void {
    this.getBookingData();
  }
  getBookingData() {
    this.isLoading = true;
    this.bookingService
      .getAllBooking(this.bookingStatus)
      .subscribe((res: any) => {
        this.bookingArr = res;
        this.isLoading = false;
      });
  }
  onViewBooking(id: string) {
    this.router.navigateByUrl(`layout/my-booking/${id}`);
  }
  updateBookingStatus(newStatus: string) {
    this.bookingStatus = newStatus;
    this.getBookingData();
  }
}
