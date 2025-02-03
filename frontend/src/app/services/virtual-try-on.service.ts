import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VirtualTryOnService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // run the python script and get the Response
  // postRunDetection(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   console.log('token from local storage : ', token);
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   console.log(headers);
  //   return this.http.post<any>(`${this.baseUrl}/bestStyle`, {
  //     headers,
  //     token,
  //     withCredentials: true,
  //   });

  postRunDetection(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('token from local storage:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${this.baseUrl}/bestStyle`,
      {},
      { headers, withCredentials: true }
    );
  }
}
