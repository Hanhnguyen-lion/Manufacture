import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserItem } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from '../enviroments/enviroment';
import { BaseService } from './base-service';

const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  httpHeaders = {headers: new HttpHeaders(
    {
      "Content-Type": "application/json"
    })};

  private userItemSubject: BehaviorSubject<UserItem | null>;
  private tokenExpirationTimeout: any;

  public userItem: Observable<UserItem | null>;
  
  constructor(
    private svc: BaseService,
    private http: HttpClient,
    private router: Router
  ){
    this.userItemSubject = new BehaviorSubject<UserItem | null>(null);
    this.userItem = this.userItemSubject.asObservable();
  }
    
  login(credentials: any): Observable<any>{
    let url = `${enviroment.apiUrl}/user/Authenticate`;
    return this.http.post<any>(url, credentials).pipe(
          map(response => {
            if (response.status_code == 200) {
              var token = response.detail;

              if (token){
                this.setLogoutTimer(token);
                localStorage.setItem("currentUser", JSON.stringify(token));
                const payload = token.split('.')[1]; // Payload is the middle part
                // Decode the base64-encoded payload
                const decodedPayload = window.atob(payload);

                this.userItemSubject.next(JSON.parse(decodedPayload));
              }
            }
            return response;
          })
        );
  }
  
  private setLogoutTimer(token: string): void {
    const expiryTime = this.getExpirationTime(token); // Function to get 'exp' claim
    const timeUntilExpiry = expiryTime - Date.now();

    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }

    this.tokenExpirationTimeout = setTimeout(() => this.logout(), timeUntilExpiry);
  }

  public getExpirationTime(token: string): number {
    // Decode token and return expiration time in milliseconds
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.expires * 1000; // JWT exp is in seconds, convert to milliseconds
  }

  logout() {
      clearTimeout(this.tokenExpirationTimeout);
      this.userItemSubject.next(null);
      localStorage.removeItem("currentUser")
      localStorage.removeItem(STORE_KEY);
      window.localStorage.clear();
      this.router.navigate(['/Login']);
  }

  public get getToken(): string | null{
    return localStorage.getItem("currentUser");
  }

  public get userValue(): UserItem | null{
    return this.userItemSubject.value;
  }

  public get isUser(): boolean{
    if (this.userValue && this.userValue.role != "Super Admin")
      return true;
    return false;
  }

  public get isSuperAdmin(): boolean{
    if (this.userValue && this.userValue.role == "Super Admin")
      return true;
    return false;
  }

  public get currentCompanyId(): string | null{
    if (this.userValue)
      return this.userValue.company_id;
    return null;
  }
}
