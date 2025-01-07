import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from './../../../../service/Transaction/transaction.service';
import { Component, inject, OnInit } from '@angular/core';
import { TimeConverterPipe } from '../../../resuable/time/time-converter.pipe';
import { LoaderComponent } from '../../../resuable/loader/loader.component';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, TimeConverterPipe, LoaderComponent],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
})
export class PaymentDetailsComponent implements OnInit {
  transactionService = inject(TransactionService);
  transactions: any[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.transactionService.getUserTransaction().subscribe((res: any) => {
      this.transactions = res;
      this.isLoading = false;
    });
  }
}
