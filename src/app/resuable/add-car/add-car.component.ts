import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarService } from '../../../service/CarService/car.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css',
})
export class AddCarComponent {
  @Output() getAllCar = new EventEmitter();
  router = inject(Router);
  newFeature: string = '';
  car: any = '';
  carImage: File | null = null;
  CarForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    carNumber: new FormControl('', Validators.required),
    year: new FormControl(0, [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
    ]),
    pricePerDay: new FormControl(0, [Validators.required, Validators.min(1)]),
    mileage: new FormControl(0, [Validators.required, Validators.min(1)]),
    color: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    carLocation: new FormControl('', Validators.required),
    seats: new FormControl(0, [Validators.required, Validators.min(1)]),
    cancellation: new FormControl(false, Validators.required),
    fuelType: new FormControl('', Validators.required),
    transmission: new FormControl('', Validators.required),
    securityDeposit: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
    availabilityStatus: new FormControl(true, Validators.required),
    DeliveryType: new FormControl('', Validators.required),
  });
  features: any[] = [];
  carService = inject(CarService);
  alertService = inject(AlertService);
  addFeature() {
    this.features.push(this.newFeature);
    this.newFeature = '';
  }
  removeFeature(i: any) {
    this.features.splice(i, 1);
  }
  onFileSelected(event: any): void {
    this.carImage = event.target.files[0];
    console.log(this.carImage);
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('companyName', this.CarForm.controls.companyName.value!);
    formData.append('model', this.CarForm.controls.model.value!);
    formData.append('carNumber', this.CarForm.controls.carNumber.value!);
    formData.append('year', this.CarForm.controls.year.value!.toString());
    formData.append(
      'pricePerDay',
      this.CarForm.controls.pricePerDay.value!.toString()
    );
    formData.append('mileage', this.CarForm.controls.mileage.value!.toString());
    formData.append('color', this.CarForm.controls.color.value!);
    formData.append('city', this.CarForm.controls.city.value!);
    formData.append('carLocation', this.CarForm.controls.carLocation.value!);
    formData.append('seats', this.CarForm.controls.seats.value!.toString());
    formData.append(
      'cancellation',
      this.CarForm.controls.cancellation.value!.toString()
    );
    formData.append('fuelType', this.CarForm.controls.fuelType.value!);
    formData.append('transmission', this.CarForm.controls.transmission.value!);
    formData.append(
      'securityDeposit',
      this.CarForm.controls.securityDeposit.value!.toString()
    );
    formData.append(
      'availabilityStatus',
      this.CarForm.controls.availabilityStatus.value!.toString()
    );
    formData.append('DeliveryType', this.CarForm.controls.DeliveryType.value!);

    formData.append('features', this.features.join(','));

    if (this.carImage) {
      formData.append('carImage', this.carImage, this.carImage.name);
    }
    this.carService.addCar(formData).subscribe(
      (res) => {
        // alert('Car Added successfully.');
        this.alertService.getToast('success', 'Car Added Successfully.');

        this.getAllCar.emit();
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
}
