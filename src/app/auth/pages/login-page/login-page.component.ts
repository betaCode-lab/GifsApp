import { AuthenticateService } from '../../services/authenticate.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../../models/auth/login';
import { Router, RouterLink } from '@angular/router';
import { Token } from '@angular/compiler';
import { TokenHandlerService } from '../../services/token-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  private router: Router = inject(Router)
  private authService: AuthenticateService = inject(AuthenticateService);
  private tokenService: TokenHandlerService = inject(TokenHandlerService);
  public jwtToken!:Token;

  // Form
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // Getters
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Actions
  login():void {
    if(this.loginForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Both fields are required."
      });

      return;
    }

    // Create credentials
    const credentials: Login = {
      Email: this.email?.value!,
      Password: this.password?.value!
    }

    // Make login
    this.authService.login(credentials).subscribe({
      next: (jwtToken) => {
        this.tokenService.storeToken(jwtToken.token);
        this.router.navigate(['gifs/home']);
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
