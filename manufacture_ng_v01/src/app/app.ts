import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService
  ){}

  isAuthenticate(){
    if (this.authService.getToken){
      return true;
    }
    return false;
  }

  currentUserName(){
    return this.authService.currentUserName;
  }

  logout(){
    this.authService.logout();
  }

}
