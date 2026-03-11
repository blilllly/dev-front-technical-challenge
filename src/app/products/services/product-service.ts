import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Datum, ResponseBP } from '../interfaces/responseBP.interface';

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

  createProduct(product: Datum): Observable<ResponseBP> {
    return this.http.post<ResponseBP>(`/bp/products`, product);
  }
}
