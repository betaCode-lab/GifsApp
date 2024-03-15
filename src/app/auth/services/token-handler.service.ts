import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtToken } from '../../models/auth/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenHandlerService {
  private url:string = 'https://localhost:7075/api';
  private http: HttpClient = inject(HttpClient);

  constructor() { 
    this.verifyToken(this.getToken() ?? '');
  }

  storeToken(token:string):void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  verifyToken(jwt: string): Observable<boolean> {
    const token: JwtToken = {
      token: jwt
    }
    return this.http.post<boolean>(`${this.url}/Auth/Validate`, token);
  }
}
