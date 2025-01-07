import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../../../service/CarService/car.service';
import { CurrencyPipe } from '@angular/common';
import { EditCarDetailsComponent } from '../edit-car-details/edit-car-details.component';
import { AlertService } from '../../../../service/alert/alert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-car-information',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, EditCarDetailsComponent],
  templateUrl: './car-information.component.html',
  styleUrl: './car-information.component.css',
})
export class CarInformationComponent {
  car: any;
  alertService = inject(AlertService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  carService = inject(CarService);
  carId: string = '';
  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
    this.getCarDetails();
  }
  getCarDetails() {
    this.carService.getCarDetails(this.carId).subscribe((res) => {
      this.car = res;
    });
  }
  onDelete() {
    // const isDelete = confirm('Are you sure?');
    // if (isDelete) {
    //   this.carService.deleteCar(this.carId).subscribe(
    //     (res) => {
    //       this.alertService.getToast('success', 'Car deleted successfully.');
    //       this.router.navigateByUrl('admin/my-cars');
    //     },
    //     (error) => {
    //       this.alertService.getToast('error', error.error.message);
    //     }
    //   );
    // }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this car!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel please!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Delete!', 'Car has been deleted.', 'success');
        this.carService.deleteCar(this.carId).subscribe(
          (res) => {
            this.router.navigateByUrl('admin/my-cars');
          },
          (error) => {
            this.alertService.getToast('error', error.error.message);
          }
        );
      } else {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  }
}
