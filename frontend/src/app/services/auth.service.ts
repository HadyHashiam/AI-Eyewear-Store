import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/login`, body, {
      withCredentials: true,
    });
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.baseUrl}/signup`, body);
  }
}
