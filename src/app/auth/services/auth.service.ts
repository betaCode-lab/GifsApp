import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { HTTPErrorResponse } from '../interfaces/userResponse';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  login(email:string, password:string):Observable<any> {
    const data: Login = {
      email,
      password
    }

    return this.http.post<any>('https://localhost:7148/api/Auth/login', data);
  }

  createUser(user: User):Observable<HTTPErrorResponse> {
    return this.http.post<HTTPErrorResponse>('https://localhost:7148/api/Auth/register', user);
  }
}
