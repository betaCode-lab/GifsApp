import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../auth/services/token.service';
import Swal from 'sweetalert2';
import { UserDTO } from '../../interfaces/userDTO';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  private tokenService:TokenService = inject(TokenService);
  private userService:UserService = inject(UserService);
  private route:Router = inject(Router);

  public id!: number;
  public user!: UserDTO;

  public profileForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor() {
    this.id = this.tokenService.getId();
    this.userService.getUser(this.id).subscribe(data => {
      this.user = data;
      this.profileForm.get('username')?.setValue(data.username);
      this.profileForm.get('email')?.setValue(data.email!);
    });
  }

  get username() {
    return this.profileForm.get('username');
  }

  get email() {
    return this.profileForm.get('email');
  }

  editProfile(): void {
    if(this.profileForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error'
      });
    }

    const userModified:UserDTO = {
      idUser: this.user.idUser,
      username: this.username?.value!,
      email: this.email?.value!
    }

    this.userService.editProfile(userModified).subscribe({
      next: () => {
        Swal.fire({
          title: 'Saved!',
          text: 'Changes saved succesfully',
          icon: 'success'
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error,
          icon: 'error'
        });
      }
    });
  }

  deleteAccount(id:number):void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteAccount(id).subscribe({
          next: () => {
            this.tokenService.logout();
            this.route.navigate(['/auth/login']);
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: err.error,
              icon: 'error'
            });
          }
        });
      }
    });
  }
}
