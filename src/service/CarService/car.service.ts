import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080/car';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  http = inject(HttpClient);
  constructor() {}
  getAllCars(searchQuery: string, searchCity: string) {
    let params = new HttpParams()
      .set('name', searchQuery)
      .set('city', searchCity);
    return this.http.get(API_URL, { params });
  }
  getCarDetails(carId: string) {
    return this.http.get(`${API_URL}/${carId}`);
  }
  updateCar(id: string, payload: any) {
    return this.http.patch(`${API_URL}/${id}`, payload);
  }
  addCar(payload: any) {
    return this.http.post(API_URL, payload);
  }
  deleteCar(id: any) {
    return this.http.delete(`${API_URL}/${id}`);
  }
  getAdminCars() {
    return this.http.get(`${API_URL}/admin`);
  }
}
