import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.module';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  http= inject(HttpClient);

  

  getVoucher(): Observable<IVoucher[]>{
    return this.http.get<IVoucher[]>('api/voucher');
  }
}
