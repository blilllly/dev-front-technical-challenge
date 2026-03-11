import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseBP } from '../interfaces/responseBP.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<ResponseBP> {
    return this.http.get<ResponseBP>('/bp/products');
  }

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`/bp/products/verification/${id}`);
  }
}
