import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-user-page.component.html',
})
export class CreateUserPageComponent {
  private authService: AuthService = inject(AuthService);

  public createUserForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  get username() {
    return this.createUserForm.get('username');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password')
  }

  get confirmPassword() {
    return this.createUserForm.get('confirmPassword')
  }

  createUser(): void {
    if(this.createUserForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error'
      });

      return;
    }

    const user:User = {
      idUser: 0,
      username: this.createUserForm.get('username')?.value!,
      email: this.createUserForm.get('email')?.value!,
      password: this.createUserForm.get('password')?.value!
    }

    this.authService.createUser(user).subscribe({
      next:() => {
        this.createUserForm.reset();

        Swal.fire({
          title: 'Created',
          text: 'The user has been created',
          icon: 'success'
        });
      },
      error:(err) => {
        Swal.fire({
          title: 'Oops!',
          text: err.error,
          icon: 'error'
        });
      }
    });
  }
}
