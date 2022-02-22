import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  backendhost='https://nitecartbackend.herokuapp.com/';
  myorders='https://nitecartbackend.herokuapp.com/myorders';
  users='https://nitecartbackend.herokuapp.com/users';
  products='https://nitecartbackend.herokuapp.com//products';
  setstatus='https://nitecartbackend.herokuapp.com//set_status';
  cancelorder='https://nitecartbackend.herokuapp.com//cancelorder';
  totalorder='https://nitecartbackend.herokuapp.com//orders';

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
