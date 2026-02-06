import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from './services/auth.service';
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
export class App{

  constructor(
    private authService: AuthService
  ){
  }
  
  isAuthenticate(){
    if (this.authService.userValue){
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