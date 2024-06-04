import { Injectable, inject } from '@angular/core';
import { IRecycle, IRecycleCenterRow, IRecyleCenter } from '../models/recycle.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecycleService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http:HttpClient, private authService: AuthService){}

  private getHeaders(): HttpHeaders {
    const token = this.authService.token();
    console.log('Using token in headers:', token); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createBoardCenter(createBoardCenter:IRecyleCenter): Observable<IRecycle> {
    console.log("click2");
    return this.http.post<IRecycle>(`${this.apiUrl}/recycle-center`, createBoardCenter, { headers: this.getHeaders() })
    .pipe(
      catchError(error => {
        if (error.status === 401) {
          // Manejar error de autorización aquí
          console.error('Unauthorized error:', error);
        } else {
          console.error('Error creating center:', error);
        }
        throw error; // Asegúrate de relanzar el error para que sea manejado en el componente
      })
    );
  }

  getRecycle(): Observable<IRecycleCenterRow[]> {
    return this.http.get<IRecycleCenterRow[]>(`${this.apiUrl}/recycle-center`, { headers: this.getHeaders() });
  }
}
