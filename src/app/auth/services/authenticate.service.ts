import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtToken } from '../../models/auth/token';
import { Login } from '../../models/auth/login';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/auth/user';
import { ChangePassword } from '../../models/auth/changePassword';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private url:string = 'https://localhost:7075/api';
  private router: Router = inject(Router);
  private http:HttpClient = inject(HttpClient);

  constructor() { }

  // Authenticate user
  login(credentials: Login): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.url}/Auth/Login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create new account
  createAccount(user: User):Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/Register/CreateAccount`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Close session
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  // Verify account to change password
  resetPassword(email:string): Observable<boolean> {
    const changePassword: ChangePassword = {
      email
    }
    return this.http.post<boolean>(`${this.url}/Auth/SendPasswordResetEmail`, changePassword)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Change password
  changePassword(obj: ChangePassword):Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/Auth/ChangePassword`, obj)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage:string = '';

    console.log(error)
    if(error.status === 0) {
      errorMessage = "An error ocurred, please try again later.";
    } else {
      errorMessage = error.error instanceof ErrorEvent ? error.error.message : error.error;
    }
    
    // The backend returned an unsuccessful response code.
    return throwError(() => new Error(errorMessage));
  }
}
