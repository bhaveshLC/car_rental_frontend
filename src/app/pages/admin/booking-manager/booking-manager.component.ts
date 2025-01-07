import { Component, inject } from '@angular/core';
import { BookingService } from '../../../../service/Booking/booking.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../resuable/loader/loader.component';

@Component({
  selector: 'app-booking-manager',
  standalone: true,
  imports: [CommonModule, DatePipe, LoaderComponent],
  templateUrl: './booking-manager.component.html',
  styleUrl: './booking-manager.component.css',
})
export class BookingManagerComponent {
  bookings: any[] = [];
  isLoading: boolean = false;
  router = inject(Router);
  bookingService = inject(BookingService);
  ngOnInit(): void {
    this.isLoading = true;
    this.bookingService.getAllAdminBooking().subscribe((res: any) => {
      this.bookings = res.results;
      // console.log(res);
      this.isLoading = false;
    });
  }
  onView(id: string) {
    this.router.navigateByUrl(`admin/booking/${id}`);
  }
}
