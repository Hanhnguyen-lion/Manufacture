import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId?: any;
  // Use a Subject for logging out, which can be subscribed to in a component
  public logoutAction$ = new Subject<void>(); 

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.initListener();
    this.check();
  }

  // Store the last action timestamp in localStorage
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  public getLastAction(): number {
    return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
  }

  // Initialize event listeners
  initListener() {
    // Listen for common user activity events
    document.body.addEventListener('click', () => this.resetTimer());
    document.body.addEventListener('mousemove', () => this.resetTimer());
    document.body.addEventListener('keypress', () => this.resetTimer());
  }

  // Check the elapsed time repeatedly
  check() {
    setInterval(() => {
      const now = Date.now();
      const lastAction = this.getLastAction();
      if (lastAction && now - lastAction > INACTIVITY_TIMEOUT) {

        this.authService.logout();
        this.logoutAction$.next();
      }
    }, 15000); // Check every 15 seconds
  }

  // Reset the timer on user activity
  resetTimer() {
    this.setLastAction(Date.now());
  }

  // Perform the logout
  logout() {
    // Clear session data, local storage items, etc.
    localStorage.removeItem(STORE_KEY);
    // Navigate to the login page or dispatch a logout action
    this.router.navigate(['/Login']);
    this.logoutAction$.next(); // Notify subscribers
  }  
}
