import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'https://car-rental-backend-lnxb.onrender.com/booking';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  http = inject(HttpClient);
  constructor() {}
  createCarBooking(payload: any, carId: any) {
    return this.http.post(`${API_URL}/${carId}`, payload);
  }
  getAllBooking(bookingStatus: string) {
    return this.http.get(`${API_URL}/user/${bookingStatus}`);
  }
  getBookingDetails(id: any) {
    return this.http.get(`${API_URL}/${id}`);
  }
  makePayment(id: any, payload: any) {
    return this.http.patch(`${API_URL}/${id}`, payload);
  }
  cancelBooking(id: string, reason: string) {
    return this.http.patch(`${API_URL}/cancel/${id}`, { reason });
  }
  getAllAdminBooking() {
    return this.http.get(`${API_URL}/admin`);
  }
  confirmBooking(id: string) {
    return this.http.patch(`${API_URL}/confirm/${id}`, {});
  }
  applyCoupon(totalPrice: Number, couponCode: string) {
    return this.http.post(`${API_URL}/coupon`, { totalPrice, couponCode });
  }
}
