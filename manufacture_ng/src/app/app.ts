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
    if (this.authService.userValue && this.authService.userValue.role == "Super Admin"){
      return true;
    }
    return false;
  }

  logout(){
    this.authService.logout();
  }
}