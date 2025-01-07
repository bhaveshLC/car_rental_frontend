import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent {
  @Input() car: any;
  router = inject(Router);
  viewCarDetails(carId: any) {
    this.router.navigateByUrl(`layout/cars/${carId}`);
  }
}
