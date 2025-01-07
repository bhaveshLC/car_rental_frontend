import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'https://car-rental-backend-lnxb.onrender.com/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}
  handleLogin(username: string, password: string) {
    return this.http.post(`${API_URL}/user/login`, { username, password });
  }
  handleAdminLogin(username: string, password: string) {
    return this.http.post(`${API_URL}/login`, { username, password });
  }
  handleSubscription(payload: any) {
    return this.http.post(`${API_URL}/subscribe`, payload);
  }
  getUser(id: string) {
    return this.http.get(`${API_URL}/${id}`);
  }
  updateUser(payload: any) {
    return this.http.patch(`${API_URL}`, payload);
  }
  updateAdmin(payload: any) {
    return this.http.patch(`${API_URL}/admin`, payload);
  }
  createUser(payload: any) {
    return this.http.post(`${API_URL}/`, payload);
  }
  createAdmin(payload: any) {
    return this.http.post(`${API_URL}/admin`, payload);
  }
}
