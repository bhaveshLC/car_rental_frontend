import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../../service/Booking/booking.service';
import { AlertService } from '../../../../service/alert/alert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css',
})
export class CancelComponent {
  reason: string = '';
  route = inject(ActivatedRoute);
  router = inject(Router);

  bookingService = inject(BookingService);
  alertService = inject(AlertService);
  bookingId: string = '';
  @Output() getBooking: EventEmitter<void> = new EventEmitter<void>();
  httpUrl: string = '';
  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params['id'];
    if (this.router.url) {
      this.httpUrl = 'admin';
    }
  }
  // onCancel() {
  //   console.log(this.bookingId, this.reason);
  //   this.bookingService.cancelBooking(this.bookingId, this.reason).subscribe(
  //     (res) => {
  //       this.alertService.getToast('success', 'Booking Cancelled Successfully');
  //       this.getBooking.emit();
  //     },
  //     (error) => {
  //       this.alertService.getToast('error', error.error.message);
  //     }
  //   );
  // }
  onCancel() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this booking!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, cancel please!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancelled!', 'Booking has been cancel.', 'success');
        if (this.httpUrl == 'admin') {
          this.bookingService
            .adminCancelBooking(this.bookingId, this.reason)
            .subscribe(
              (res) => {
                this.getBooking.emit();
              },
              (error) => {
                this.alertService.getToast('error', error.error.message);
              }
            );
        } else {
          this.bookingService
            .cancelBooking(this.bookingId, `${this.reason} (From Admin)`)
            .subscribe(
              (res) => {
                this.getBooking.emit();
              },
              (error) => {
                this.alertService.getToast('error', error.error.message);
              }
            );
        }
      } else {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  }
}
