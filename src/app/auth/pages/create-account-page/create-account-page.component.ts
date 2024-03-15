import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import Swal from 'sweetalert2';
import { User } from '../../../models/auth/user';

@Component({
  selector: 'app-create-account-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './create-account-page.component.html',
  styles: ``
})
export class CreateAccountPageComponent {
  private router: Router = inject(Router);
  private authService: AuthenticateService = inject(AuthenticateService);
  public createAccount = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  });

  get username() {
    return this.createAccount.get('username');
  }

  get email() {
    return this.createAccount.get('email');
  }

  get password() {
    return this.createAccount.get('password');
  }

  get confirmPassword() {
    return this.createAccount.get('confirmPassword');
  }

  create(): void {
    // Validate fields
    if(this.createAccount.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required."
      });
      return;
    }

    const user:User = {
      idUser: 0,
      username: this.username?.value!,
      email: this.email?.value!,
      password: this.password?.value!,
      confirmPassword: this.confirmPassword?.value!
    }

    this.authService.createAccount(user).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Created",
          text: "User created successfully"
        });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error
        });
      }
    });
  }
}
