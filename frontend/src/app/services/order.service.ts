import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers);
    return this.http.get<any>(`${this.baseUrl}/orders`, {
      headers,
      withCredentials: true,
    });
  }

  // Delete cart item
  cancelOrder(orderId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.baseUrl}/orders/cancel`, {
      body: { orderId }, // إرسال cartId في جسم الطلب
      withCredentials: true,
      headers,
    });
  }

  // إرسال طلب جديد
  checkout(orderData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.baseUrl}/checkout`, orderData, {
      headers,
      withCredentials: true,
    });
  }

  // استرجاع تفاصيل الطلب بعد النجاح
  getSuccess(orderData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.baseUrl}/succes`, {
      headers,
      params: orderData,
      withCredentials: true,
    });
  }
}
