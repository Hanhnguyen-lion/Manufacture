import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService    
  ){
    
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    if (this.authService.getToken){
        return true;
    }
    else{
        this.router.navigate(["/Login"]);
        return false;
    }
  }
  
}
