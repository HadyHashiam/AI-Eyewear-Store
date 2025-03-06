import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  private baseUrl = 'http://localhost:3000/addproduct';

  constructor(private http: HttpClient) {}

  AddProduct(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
}
