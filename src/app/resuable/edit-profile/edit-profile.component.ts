import { AuthService } from './../../../service/AuthService/auth.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../service/alert/alert.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  @Input() user: any;
  @Input() role: string = '';
  @Output() getUser: EventEmitter<void> = new EventEmitter();
  authService = inject(AuthService);
  alertService = inject(AlertService);
  onUpdate() {
    const payload = {
      name: this.user.name,
      phoneNumber: this.user.phoneNumber,
    };
    if (this.role == 'admin') {
      this.authService.updateAdmin(payload).subscribe(
        (res) => {
          this.alertService.getToast('success', 'User Updated Successfully.');
          this.getUser.emit();
        },
        (error) => {
          this.alertService.getToast('error', error.error.message);
        }
      );
    } else {
      this.authService.updateUser(payload).subscribe(
        (res) => {
          this.alertService.getToast('success', 'User Updated Successfully.');
          this.getUser.emit();
        },
        (error) => {
          this.alertService.getToast('error', error.error.message);
        }
      );
    }

    console.log(this.user);
  }
}
