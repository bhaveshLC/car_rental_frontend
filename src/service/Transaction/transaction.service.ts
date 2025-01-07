import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
const API_URL =
  'http://localhost:8080/transaction/admin';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  http = inject(HttpClient);
  constructor() {}
  getUserTransaction() {
    return this.http.get(API_URL);
  }
}
