import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
 
  httpHeaders = {headers: new HttpHeaders(
    {
      "Content-Type": "application/json"
    })};

  constructor(public http: HttpClient){}

  FindAllItems(url: string): Observable<any[]>{
    return this.http.get<any[]>(url);
  }

  FindItemById(url: string, id: string): Observable<any>{
    url = `${url}/${id}`;
    return this.http.get<any>(url)
    .pipe(map(item=>{
      return item;
    }));
  }

  DeleteItem(url: string, id: string): Observable<void>{
    url = `${url}/${id}`;
    return this.http.delete<void>(url);
  }

  AddItem(url: string, item: any): Observable<any>{
    return this.http.post<any>(url, item, this.httpHeaders).pipe(
      catchError(this.handleError))
  }

  UpdateItem(url: string, item: any): Observable<any>{
    url = `${url}/${item.id}`;
    return this.http.put<any>(url, item, this.httpHeaders);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.error("error: ", error, "error.error:", error.error);
    console.error(error.error);
    if (error.error && error.error.status !== 200) {
      errorMessage = error.error.detail;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
