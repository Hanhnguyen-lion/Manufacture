import { Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from './services/auth.service';
import { InactivityService } from './services/inactivity.service';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink, 
    RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  constructor(
    private authService: AuthService,
    private inactivityService: InactivityService
    // ,
    // private idle: Idle
  ){
    
    // idle.setIdle(900);

    // idle.setTimeout(60);

    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(()=> 
    //   console.log("User no longer ide"));

    // idle.onTimeout.subscribe(()=>{
    //   console.log("Session timed out! Logging out user")

    //   this.logout();
    // });

    // idle.onIdleStart.subscribe(()=>{
    //   console.log("User has gone ide !");
    // });

    //idle.watch();

  }

  ngOnInit() {
    if (this.authService.getToken){
      const expiryTime = this.authService.getExpirationTime(this.authService.getToken);
      const timeUntilExpiry = expiryTime - Date.now();

      if (new Date(expiryTime) > new Date()){
      console.log("expiryTime: ", expiryTime, new Date(expiryTime), new Date());
    }
      else{
        console.log("logout: ", expiryTime, new Date(expiryTime), new Date());
      }
    }

    this.inactivityService.setLastAction(Date.now()); // Set initial time on app load/login
    this.inactivityService.logoutAction$.subscribe(() => {
      console.log('User has been logged out due to inactivity.');
      // Additional logout logic if needed
    });
  }
  
  isAuthenticate(){
    if (this.authService.getToken){
      return true;
    }
    return false;
  }
  
  isSuperAdmin(){
    return this.authService.isSuperAdmin;
  }

  logout(){
    this.authService.logout();
  }
}