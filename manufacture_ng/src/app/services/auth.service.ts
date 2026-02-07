import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserItem } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from '../enviroments/enviroment';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  httpHeaders = {headers: new HttpHeaders(
    {
      "Content-Type": "application/json"
    })};

  private userItemSubject: BehaviorSubject<UserItem | null>;
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

  logout() {
      this.userItemSubject.next(null);
      localStorage.removeItem("currentUser")
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
