import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials);
  }

  updateProfile(userData: any): Observable<any> {  // <-- add this
    return this.http.put(`${this.apiUrl}/profile/`, userData);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  setLoginStatus(status: boolean) {
    this.loggedIn.next(status);
  }
}
