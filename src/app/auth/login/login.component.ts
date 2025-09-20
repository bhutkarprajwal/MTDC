import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment'; // import global URL

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  title = 'Login Page';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  onLogin() {
    const payload = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(`${environment.apiUrl}/login/`, payload)  // use global URL
      .pipe(
        catchError(err => {
          alert(err.error?.error || 'Login failed');
          return throwError(() => err);
        })
      )
      .subscribe(res => {
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));  // store real user details
          this.authService.setLoginStatus(true);                   // update login state
          this.router.navigate(['/profile']);                       // navigate to profile
        } else {
          alert('Invalid login response');
        }
      });
  }
}
