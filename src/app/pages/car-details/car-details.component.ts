import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../../service/CarService/car.service';
import { CurrencyPipe } from '@angular/common';
import { BookingComponent } from '../../resuable/booking/booking.component';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, BookingComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit {
  car: any;
  route = inject(ActivatedRoute);
  carService = inject(CarService);
  ngOnInit(): void {
    const carId = this.route.snapshot.params['carId'];
    this.carService.getCarDetails(carId).subscribe((res) => {
      this.car = res;
    });
  }
}
