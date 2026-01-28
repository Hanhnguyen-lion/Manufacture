import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
    return this.http.post<any>(url, item, this.httpHeaders);
  }

  UpdateItem(url: string, item: any): Observable<any>{
    url = `${url}/${item.id}`;
    return this.http.put<any>(url, item, this.httpHeaders);
  }

}
