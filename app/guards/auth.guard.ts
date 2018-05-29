import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
require( "nativescript-localstorage" );


@Injectable()
export class AuthGuard implements CanActivate {
    user : any;
    sessionToken : string;
  constructor(private router: Router) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    //this.sessionToken = localStorage.getItem('sessionToken');

  }
  
  /**
   * If the user is not logged, it'll be redirected to login page.
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.user) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/']);
      return false;
  }
}