import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ICountry } from '../models/recycle.module';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient, private authService: AuthService){}

  
  private getHeaders(): HttpHeaders {
    const token = this.authService.token();
    console.log('Using token in headers:', token); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCountry(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.apiUrl}/country`, { headers: this.getHeaders() });
  }
}
