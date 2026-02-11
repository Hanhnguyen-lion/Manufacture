import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserEntity } from '../models/user';
import { Router } from '@angular/router';

import { enviroment } from '../enviroments/enviroment';
  
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpHeaders = {headers: new HttpHeaders(
    {
      "Content-Type": "application/json"
    })};

  private userItemSubject: BehaviorSubject<UserEntity | null>;
  private tokenExpirationTimeout: any;

  public userItem: Observable<UserEntity | null>;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.userItemSubject = new BehaviorSubject<UserEntity | null>(null);
    this.userItem = this.userItemSubject.asObservable();
  }
    
  login(credentials: any): Observable<any>{
    let url = `${enviroment.apiUrl}/account/authenticate`;
    return this.http.post<any>(url, credentials).pipe(
          map(response => {
            if (response.status_code == 200) {
              var token = response.detail;

              if (token){
                this.setLogoutTimer(token);
                localStorage.setItem("currentUser", JSON.stringify(token));
                const payload = token.split('.')[1];

                const decodedPayload = window.atob(payload);

                this.userItemSubject.next(JSON.parse(decodedPayload));
              }
            }
            return response;
          })
        );
  }
  
  private setLogoutTimer(token: string): void {
    const expiryTime = this.getExpirationTime(token);
    const timeUntilExpiry = expiryTime - Date.now();

    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }

    this.tokenExpirationTimeout = setTimeout(() => this.logout(), timeUntilExpiry);
  }

  public getExpirationTime(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.expires * 1000;
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

  public get userValue(): UserEntity | null{
    console.log("this.userItemSubject.value:", this.userItemSubject.value);
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

  public get currentUserName(): string | null{
    if (this.userValue)
      return `${this.userValue.last_name} ${this.userValue.first_name}`;
    return null;
  }  
}
