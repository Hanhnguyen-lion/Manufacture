import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService    
  ){
    
  }

  canActivate(){
    var account = this.authService.userValue;
    if (account){
        return true;
    }
    else{
        this.router.navigateByUrl("/Login");
        return false;
    }
  }
  
}
