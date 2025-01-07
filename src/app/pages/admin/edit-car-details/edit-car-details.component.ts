import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../../../service/CarService/car.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../service/alert/alert.service';

@Component({
  selector: 'app-edit-car-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-car-details.component.html',
  styleUrl: './edit-car-details.component.css',
})
export class EditCarDetailsComponent {
  @Input() car: any;
  features: string[] = [];
  newFeature: string = '';
  carService = inject(CarService);
  route = inject(ActivatedRoute);
  alertService = inject(AlertService);
  carId: string = '';
  @Output() getCar: EventEmitter<void> = new EventEmitter<void>();
  removeFeature(i: any) {
    this.car.features.splice(i, 1);
  }
  addFeature() {
    this.car.features.push(this.newFeature);
    this.newFeature = '';
  }
  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
  }
  onSubmit() {
    console.log(this.car);
    this.carService.updateCar(this.carId, this.car).subscribe(
      (res) => {
        this.alertService.getToast(
          'success',
          'Car Details Updated Successfully'
        );
        this.getCar.emit();
      },
      (error) => {
        this.alertService.getToast('error', error.error.message);
      }
    );
  }
}
