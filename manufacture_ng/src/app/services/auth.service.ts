import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserItem } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from '../enviroments/enviroment';

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
    private http: HttpClient,
    private router: Router
  ){
    this.userItemSubject = new BehaviorSubject<UserItem | null>(null);
    this.userItem = this.userItemSubject.asObservable();
  }
    
  login(credentials: any): Observable<any>{
    const url = `${enviroment.apiUrl}/user/Authenticate`;
    return this.http.post<any>(url, credentials).pipe(
          map(response => {
            console.log("response:", response);
            if (response.status_code == 200) {
              this.userItemSubject.next(response.detail);
            }
            return response;
          })
        );
  }

  logout() {
      this.userItemSubject.next(null);
      this.router.navigate(['/Login']);
  }

  public get userValue(): UserItem | null{
    return this.userItemSubject.value;
  }
}
