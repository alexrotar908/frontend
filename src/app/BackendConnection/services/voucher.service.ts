import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.module';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiUrl = 'api/voucher';

  constructor(private http: HttpClient) { }

  getVoucher(token: string): Observable<IVoucher[]> {
    // Agregar el token en los encabezados de la solicitud
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<IVoucher[]>(this.apiUrl, { headers });
  }
  }

