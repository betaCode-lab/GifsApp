import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserDTO } from '../../models/DTO/userDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http:HttpClient = inject(HttpClient);
  public url:string = 'https://localhost:7075/api';

  constructor() { }

  getUserById(id:number):Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.url}/Account/GetUserById/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProfile(id:number, user:UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.url}/Account/UpdateProfile/${id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAccount(id: number):Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/Account/DeleteAccount/${id}`)
          .pipe(
            catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage:string = '';

    errorMessage = error.error;
    
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
