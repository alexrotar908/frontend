import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl= 'http://localhost:3000';

  constructor(private http:HttpClient, private authService:AuthService){}

  private getHeaders():HttpHeaders{
    const token = this.authService.token();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public post<T>(endpoint:string, data:any): Observable<T>{
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data,
      {headers:this.getHeaders()}
    );
  }

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  public patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, data, { headers: this.getHeaders() });
  }

  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }
}
