import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  backendhost='http://localhost:3000/';
  myorders='http://localhost:3000/myorders';
  users='http://localhost:3000/users';
  products='http://localhost:3000/products';
  setstatus='http://localhost:3000/set_status';
  cancelorder='http://localhost:3000/cancelorder';
  totalorder='http://localhost:3000/orders';

  constructor(private _http:HttpClient) { }

  getdelAdd():Observable<any>{
  return this._http.get(`${this.totalorder}`);
}

  getdelAddbyId(userId:any):Observable<any>{
  return this._http.post(`${this.myorders}`,userId);
}

  getuserData():Observable<any>{
  return this._http.get(`${this.users}`)
}

  getprodData():Observable<any>{
  return this._http.get(`${this.products}`)
}

  postproData(proddata:any, ):Observable<any>{
  return this._http.post(`${this.products}`,this.toFormData(proddata) )
}

  deleteprodbyId(ProdId:any){
  return this._http.delete(`${this.products}/${ProdId}`);
}

  setOrderStatus(order_id:string, statuskey: string, statusValue:string){
  return this._http.put(`${this.setstatus}`, {order_id, statuskey, statusValue});
}

cancelOrder(order_id:string){
  return this._http.put(`${this.cancelorder}`,{order_id,});
}

  public toFormData( formValue: any ) {
  const formData = new FormData();
  for ( const key of Object.keys(formValue) ) {
  const value = formValue[key];
  formData.append(key, value);
  }
  return formData;
  }

}
