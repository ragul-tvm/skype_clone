import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Person, User } from 'src/assets/user.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  private dataUrl = 'http://localhost:5000/api/users'

  


  constructor(private client: HttpClient,
    private config: ConfigService) { }


  getUserId() {

  }


  getUserByToken(token: string | null): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.client.get<User>(this.dataUrl + '/detail', httpOptions).pipe(
      catchError(this.config.errorHandler)
    );
  }

  find_user(username: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.get<User>(this.dataUrl + `/find-user/${username}`, httpOptions)
      .pipe(
        catchError(this.config.errorHandler)
      );
  }

}
