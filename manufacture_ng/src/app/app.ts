import { Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    RouterLinkWithHref
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    console.log("returnUrl:", returnUrl);
  }

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

  onClickHref(action:string){
    if (action == "Home")
      this.router.navigateByUrl("/");
    if (action == "Production")
      this.router.navigateByUrl("/Production");
  }
}
