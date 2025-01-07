import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../../../../service/CarService/car.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddCarComponent } from '../../../resuable/add-car/add-car.component';
import { LoaderComponent } from '../../../resuable/loader/loader.component';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [CommonModule, AddCarComponent, LoaderComponent],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.css',
})
export class MyCarsComponent implements OnInit {
  carService = inject(CarService);
  cars: any[] = [];
  router = inject(Router);
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getAllCar();
  }
  getAllCar() {
    this.isLoading = true;
    this.carService.getAdminCars().subscribe((res: any) => {
      this.isLoading = false;
      this.cars = res;
    });
  }
  onView(id: string) {
    this.router.navigateByUrl(`admin/car-details/${id}`);
  }
}
