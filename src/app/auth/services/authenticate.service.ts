import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtToken } from '../../models/auth/token';
import { Login } from '../../models/auth/login';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private url:string = 'https://localhost:7075/api';
  private router: Router = inject(Router);
  private http:HttpClient = inject(HttpClient);

  constructor() { }

  login(credentials: Login): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.url}/Auth/Login`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  createAccount(user: User):Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/Register/CreateAccount`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage:string = '';

    if(error.status === 0) {
      errorMessage = "An error ocurred, please try again later.";
    } else {
      errorMessage = error.error;
    }

    // The backend returned an unsuccessful response code.
    return throwError(() => new Error(errorMessage));
  }
}
