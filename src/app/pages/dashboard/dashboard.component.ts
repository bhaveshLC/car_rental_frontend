import { Component, inject, OnInit } from '@angular/core';
import { CarsComponent } from '../cars/cars.component';
import { CarService } from '../../../service/CarService/car.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../resuable/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CarsComponent, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  carService = inject(CarService);
  cars: any[] = [];
  searchQuery: string = '';
  searchCity: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.fetchCars();
  }
  fetchCars() {
    this.isLoading = true;
    this.carService
      .getAllCars(this.searchQuery, this.searchCity)
      .subscribe((res: any) => {
        this.cars = res;
        this.isLoading = false;
      });
  }
  onSearch() {
    this.fetchCars();
  }
  onCitySearch() {
    this.fetchCars();
  }
}
