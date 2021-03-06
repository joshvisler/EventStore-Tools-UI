// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: AuthService, private router: Router) {}

  canActivate() {

    console.info('User is login!? ' + this.user.isLoggedIn())

    if(!this.user.isLoggedIn())
    {
        console.info('User not login!')
       this.router.navigate(['/login']);
       return false;
    }
    
    return true;
  }
}