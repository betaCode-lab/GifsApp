import { Injectable, inject } from '@angular/core';
import { UserDTO } from '../interfaces/userDTO';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HTTPErrorResponse } from '../../auth/interfaces/userResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    url: string = `https://localhost:7148/api/Auth`;
    private http: HttpClient = inject(HttpClient);

    constructor() { }

    getUser(id:number):Observable<UserDTO> {
        return this.http.get<UserDTO>(`${this.url}/GetUserById/${id}`);
    } 

    editProfile(user:UserDTO): Observable<HTTPErrorResponse> {
        return this.http.put<HTTPErrorResponse>(`${this.url}/${user.idUser}`, user);
    }

    deleteAccount(id:number): Observable<HttpErrorResponse> {
        return this.http.delete<HttpErrorResponse>(`${this.url}/DeleteUser/${id}`);
    }
}
