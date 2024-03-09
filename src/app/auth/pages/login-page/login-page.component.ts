import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'auth-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private tokenService: TokenService = inject(TokenService);
  
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {

    if(this.loginForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error'
      });

      return;
    }

    this.authService.login(this.email?.value!, this.password?.value!).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.token);
        this.router.navigate(['/gifs/home']);
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.error,
          icon: 'error'
        });
      }
    });
  }
}
