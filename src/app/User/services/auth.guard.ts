import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { loginAuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: loginAuthService, private router: Router) { }

  canActivate(): any {
    if (this.service.loggedIn()) {

      return true

    } else {
      this.router.navigate(['/app-home'])
      return false
    }
  }

}
