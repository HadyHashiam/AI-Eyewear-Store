import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Get all cart items for the logged-in user
  getUserCart(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers);
    return this.http.get<any>(`${this.baseUrl}/cart`, {
      headers,
      withCredentials: true,
    });
  }

  // Save a cart item (update amount)
  saveCartItem(cartId: string, amount: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = { cartId, amount };

    return this.http.patch<any>(`${this.baseUrl}/cart/save`, body, {
      headers,
      withCredentials: true,
    });
  }

  // Delete cart item
  deleteCartItem(cartId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.baseUrl}/cart/delete`, {
      body: { cartId },
      withCredentials: true,
      headers,
    });
  }

  // استرجاع تفاصيل التوصيل بناءً على cartId
  getDeliveryDetails(cartId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.baseUrl}/deliveryDetails/`, {
      headers,
      withCredentials: true,
    });
  }

  addToCart(product: {
    name: string;
    price: number;
    image: string;
    productId: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log('Adding to cart: ', product);
    return this.http.post(`${this.baseUrl}/cart`, product, {
      headers,
      withCredentials: true,
    });
  }
}
