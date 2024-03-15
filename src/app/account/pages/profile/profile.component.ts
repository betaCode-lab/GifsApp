import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TokenHandlerService } from '../../../auth/services/token-handler.service';
import * as jwt_decode from 'jwt-decode';
import { UserDTO } from '../../../models/DTO/userDto';
import { AuthenticateService } from '../../../auth/services/authenticate.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private accountService:AccountService = inject(AccountService);
  private authService:AuthenticateService = inject(AuthenticateService);
  private tokenHandler: TokenHandlerService = inject(TokenHandlerService);
  private router: Router = inject(Router);
  public idUser: number = 0;
  public user!: UserDTO;

  public profileForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  constructor() {
    const token:UserDTO = jwt_decode.jwtDecode(this.tokenHandler.getToken()!);
    this.idUser = token.idUser;
    this.accountService.getUserById(token.idUser).subscribe({
      next: (user) => {
        this.user = user;
        this.username?.setValue(this.user.username);
        this.email?.setValue(this.user.email);
      },
      error: (error) => {
        Swal.fire({
          title: 'Oops...',
          text: error,
          icon: 'error'
        });
      }
    });
  }

  get username() {
    return this.profileForm.get('username');
  }

  get email() {
    return this.profileForm.get('email');
  }

  saveChanges():void {
    if(this.profileForm.invalid) {
      Swal.fire({
        title: 'Oops...',
        text: 'All fields are required',
        icon: 'error'
      });

      return;
    }

    const userUpdated:UserDTO = {
      idUser: this.user.idUser,
      username: this.username?.value!,
      email: this.email?.value!
    }

    this.accountService.updateProfile(this.idUser, userUpdated).subscribe({
      next: () => {
        Swal.fire({
          title: 'Updated',
          text: 'Info updated successfully',
          icon: 'success'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Oops...',
          text: error,
          icon: 'error'
        });
      }
    });
  }

  deleteAccount(): void {
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
        this.accountService.deleteAccount(this.idUser).subscribe({
          next: () => {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            Swal.fire({
              title: 'Oops...',
              text: error,
              icon: 'error'
            });
          }
        });


      }
    });


  }
}
