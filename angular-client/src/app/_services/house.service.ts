import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  _baseURL = 'http://localhost:3000/house';

  constructor(private http: HttpClient) { }

  addHouse(houseData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/add`, houseData, {headers: headers});
  }
}