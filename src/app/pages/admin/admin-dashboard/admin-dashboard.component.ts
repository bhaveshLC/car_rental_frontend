import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../../../service/Booking/booking.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { LoaderComponent } from '../../../resuable/loader/loader.component';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, LoaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  bookingService = inject(BookingService);
  bookingDetails: any;
  isLoading: boolean = false;
  config: any;
  ngOnInit(): void {
    this.isLoading = true;
    this.bookingService.getAllAdminBooking().subscribe((res: any) => {
      this.bookingDetails = res;

      const carEarnings: { [key: string]: number } = {};
      this.bookingDetails.results.forEach((booking: any) => {
        const carName = `${booking.car.companyName} ${booking.car.model}`;
        const totalPrice = booking.totalPrice;
        if (booking.bookingStatus != 'cancelled') {
          if (carEarnings[carName]) {
            carEarnings[carName] += totalPrice;
          } else {
            carEarnings[carName] = totalPrice;
          }
        }
      });

      const carNames = Object.keys(carEarnings);
      const earnings = Object.values(carEarnings);

      this.config = {
        type: 'bar',
        data: {
          labels: carNames, // Car names as x-axis labels
          datasets: [
            {
              label: 'Total Earnings (INR)', // Label for the dataset
              data: earnings, // Total earnings for each car
              backgroundColor: 'blue', // Color of the bars
            },
          ],
        },
        options: {
          aspectRatio: 4,
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      // Create the chart instance once data is available
      new Chart('MyChart', this.config);
      this.isLoading = false;
    });
  }
  // calculateCancellationRate(bookings: any[]): void {
  //   const totalBookings = bookings.length;
  //   this.cancelledBookings = bookings.filter(
  //     (booking) => booking.bookingStatus === 'cancelled'
  //   ).length;

  //   if (totalBookings > 0) {
  //     this.cancellationRate = (this.cancelledBookings / totalBookings) * 100;
  //   } else {
  //     this.cancellationRate = 0;
  //   }
  // }
}
