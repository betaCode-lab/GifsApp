import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { UserDTO } from '../../user/interfaces/userDTO';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token:string): void {
    localStorage.setItem('token', token);
  }

  getToken():string {
    return localStorage.getItem('token')!;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getId(): number {
    const decoded:UserDTO = jwt_decode.jwtDecode(this.getToken());
    return decoded.idUser;
  }
}
