import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Get all fav items for the logged-in user
  getUserFav(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers);
    return this.http.get<any>(`${this.baseUrl}/favorites`, {
      headers,
      withCredentials: true,
    });
  }

  addToFavorites(product: {
    name: string;
    price: number;
    image: string;
    productId: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('Adding to favorites: ', product);
    return this.http.post(`${this.baseUrl}/favorites`, product, {
      headers,
      withCredentials: true,
    });
  }
  // Delete fav item
  deleteFavItem(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.baseUrl}/favorites/delete`, {
      body: { productId }, // إرسال favId في جسم الطلب
      withCredentials: true,
      headers,
    });
  }
}
