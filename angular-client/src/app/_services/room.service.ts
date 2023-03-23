import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Room } from '../_classes/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomToken: any;
  room: any;


  _baseURL = 'http://localhost:3000/house';

  constructor(private http: HttpClient, private authService: AuthService) { }

  addRoom(room: Room): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/addroom`, room, {headers: headers});
  }

  getHouseNames(): Observable<any> {
    this.authService.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.authToken
    });
    return this.http.get(`${this._baseURL}/get-house-names`, {headers:headers});
  }

  getRoomNames(house): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/get-room-names`,{house:house}, {headers:headers});
  }

  getMonths(house): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/get-months`,{house:house}, {headers:headers});
  }
}