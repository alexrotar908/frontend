import { Injectable, inject } from '@angular/core';
import { ICreateBoardCenter, IRecycle } from '../models/recycle.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecycleService {

  private apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu API
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders(): HttpHeaders {
    const token = this.authService.token();
    console.log('Using token in headers:', token);  // Añade esto para depuración
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createBoardCenter(createBoardCenter: ICreateBoardCenter): Observable<IRecycle> {
    console.log("click2");
    return this.http.post<IRecycle>(`${this.apiUrl}/recyclecenter`, createBoardCenter, { headers: this.getHeaders() });
  }

  getRecycle(): Observable<IRecycle[]> {
    return this.http.get<IRecycle[]>(`${this.apiUrl}/recyclecenter`, { headers: this.getHeaders() });
  }
}
