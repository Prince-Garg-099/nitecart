import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  orderidUrl = 'https://nitecartbackend.herokuapp.com/orders';
  apiUrl = 'https://nitecartbackend.herokuapp.com//user';

  addData(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  getSingleData(getParamorderid: any): Observable<any> {
    return this._http.get(`${this.orderidUrl}/${getParamorderid}`);
  }

}


