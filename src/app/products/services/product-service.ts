import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datum, ResponseBP } from '../interfaces/responseBP.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/bp/products';

  getProducts(): Observable<ResponseBP> {
    return this.http.get<ResponseBP>(this.apiUrl);
  }

  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
  }

  createProduct(product: Datum): Observable<ResponseBP> {
    return this.http.post<ResponseBP>(this.apiUrl, product);
  }

  getProductById(id: string): Observable<Datum> {
    return this.http.get<Datum>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: string, product: Datum): Observable<ResponseBP> {
    return this.http.put<ResponseBP>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
