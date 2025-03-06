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
  logout(choice: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logout`,
      { submit: choice }, // sent the value of button
      { withCredentials: true }
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Get token from local storage if logged in / sessionStorage - cookies
    // console.log(' User is LoggedIn', token);
    console.log(' User is LoggedIn');
    return !!token; // Token exists or not
  }
}
