import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  private authService: AuthenticateService = inject(AuthenticateService);

  public resetPassword = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  get email() {
    return this.resetPassword.get('email');
  }

  resetPasswordEmail() {
    if(this.resetPassword.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The email is required"
      });

      return;
    }

    this.authService.resetPassword(this.email?.value!).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Verify your email",
          text: "We have sent an email"
        });

        this.resetPassword.reset();
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error
        });
      }
    });
  }
}
