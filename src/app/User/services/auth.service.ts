import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

function _window(): any {
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class loginAuthService {

  get nativeWindow(): any {
    return _window();
  }

  private _registerUrl = "https://nitecartbackend.herokuapp.com/register"
  private _loginUrl = "https://nitecartbackend.herokuapp.com/login"
  private _gdataUrl = "https://nitecartbackend.herokuapp.com/gregister"
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  createData(data: any) {
    return this.http.post<any>(this._registerUrl, data)
  }

  creategData(gdata: any) {
    return this.http.post<any>(this._gdataUrl, gdata)
  }

  findData(data: any) {
    return this.http.post<any>(this._loginUrl, data)
  }

  loggedIn() {
    if (!!localStorage.getItem('token')) {

      return true
    }
    if (!!localStorage.getItem('usergName')) {
      return true
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserId() {
    return localStorage.getItem('userId')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('OrderId')
    localStorage.removeItem('userName')
    localStorage.removeItem('usergName')
    this.router.navigate(['/events'])
    this.toastr.success(' Successfully logOut',);
  }
}
