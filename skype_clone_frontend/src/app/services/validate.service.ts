import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/assets/user.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {


  private dataUrl = 'http://localhost:5000/api/users'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private client: HttpClient, private config: ConfigService) { }

  checkCredential(username: string, password: string): Observable<User | any> {
    const body = {
      "userName": username,
      "password": password
    }
    return this.client.post<User | any>(this.dataUrl + '/login', body, this.httpOptions)
    .pipe(
      catchError(this.config.errorHandler)
    )
  }
}
