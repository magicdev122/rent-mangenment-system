import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../_classes/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/register`, user, {headers: headers});
  }

  getProfile(): Observable<any> {
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.get(`${this._baseURL}/profile`, {headers: headers});
  }
  getResidents(): Observable<any> {
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.get(`${this._baseURL}/residents`, {headers:headers});
  }

  setResident(data): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/set-address`, data, {headers: headers});
  }

  sendEmail(to) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/send-mail`, to, {headers: headers});
  }
}
