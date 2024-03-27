import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticateService } from '../../services/authenticate.service';
import { ChangePassword } from '../../../models/auth/changePassword';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  private authService: AuthenticateService = inject(AuthenticateService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  public changePassword = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });

  private token: string = "";

  constructor() {
    this.token = this.route.snapshot.params['token'];
  }

  get password() {
    return this.changePassword.get('password');
  }

  get confirmPassword() {
    return this.changePassword.get('confirmPassword');
  }

  changePass() {
    if(this.changePassword.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required."
      });
      
      return;
    }

    const obj: ChangePassword = {
      password: this.password?.value!,
      confirmPassword: this.confirmPassword?.value!,
      token: this.token
    }

    this.authService.changePassword(obj).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Password changed successfully"
        });

        this.router.navigate(['/auth/login']);
      },
      error: error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error
        });
      }
    });
  }
}
