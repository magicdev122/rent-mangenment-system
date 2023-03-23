import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Variable } from '../_classes/variable';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  variableToken: any;
  variable: any;


  _baseURL = 'http://localhost:3000/house';

  constructor(private http: HttpClient) { }

  addVariable(variable: Variable): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this._baseURL}/add-variable`, variable, {headers: headers});
  }

}