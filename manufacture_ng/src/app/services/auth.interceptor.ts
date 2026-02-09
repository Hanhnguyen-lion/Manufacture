import { 
  HttpErrorResponse,
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Optionally attach token here
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Log out the user if the server returns 401 Unauthorized
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}