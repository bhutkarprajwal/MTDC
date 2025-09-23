import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

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

    this.http.post<any>(`${environment.apiUrl}/login/`, payload)
      .pipe(
        catchError(err => {
          Swal.fire({
            title: 'Login Failed!',
            html: `<img src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" width="100" /> 
                   <p>${err.error?.error || 'Invalid username or password'}</p>`,
            showConfirmButton: true,
            confirmButtonColor: '#d33',
            showClass: {
              popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            }
          });
          return throwError(() => err);
        })
      )
      .subscribe(res => {
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.authService.setLoginStatus(true);

          Swal.fire({
            title: 'Welcome Back!',
            html: `<img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="120" />
                   <p>Hello ${res.user.first_name || res.user.username}!</p>`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
              popup: 'animate__animated animate__zoomInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOutUp'
            }
          }).then(() => {
            this.router.navigate(['/profile']); 
          });

        } else {
          Swal.fire({
            title: 'Unexpected Response',
            html: `<img src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" width="100" />
                   <p>Please try again later.</p>`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        }
      });
  }
}
