import { Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from './services/auth.service';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core'
import { provideHttpClient } from '@angular/common/http';

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
    private authService: AuthService
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