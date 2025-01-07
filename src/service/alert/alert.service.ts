import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  getToast(
    typeIcon: 'success' | 'error' | 'warning' | 'info',
    msg: string,
    timerProgressBar: boolean = true
  ) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: msg,
    });
  }
}
