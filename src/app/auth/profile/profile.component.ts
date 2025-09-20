import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment'; // import environment

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editMode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/user-profile/`)
      .pipe(
        catchError(err => {
          console.error(err);
          alert('Failed to fetch user details');
          this.router.navigate(['/login']);
          return throwError(() => err);
        })
      )
      .subscribe(res => {
        this.user = res;
        localStorage.setItem('user', JSON.stringify(this.user));
      });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    this.http.put<any>(`${environment.apiUrl}/update-profile/`, this.user)
      .pipe(
        catchError(err => {
          console.error(err);
          alert('Failed to update profile');
          return throwError(() => err);
        })
      )
      .subscribe(res => {
        localStorage.setItem('user', JSON.stringify(this.user));
        alert('Profile updated successfully!');
        this.editMode = false;
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }
}
