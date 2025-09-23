import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import 'animate.css';

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
    this.user = JSON.parse(storedUser);
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    const userId = this.user.id;

    Swal.fire({
      title: 'Saving your profile...',
      html: '<i class="fa fa-spin fa-spinner"></i>',
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: { popup: 'animate__animated animate__fadeInDown' }
    });

    this.http.put<any>(`${environment.apiUrl}/update_profile/${userId}/`, this.user)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: err.error?.error || 'Failed to update profile',
            showClass: { popup: 'animate__animated animate__shakeX' },
            confirmButtonColor: '#ff3d00'
          });
          return throwError(() => err);
        })
      )
      .subscribe(res => {
        Swal.close();
        if (res.user) {
          this.user = res.user;
          localStorage.setItem('user', JSON.stringify(this.user));
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated!',
            text: 'Your profile has been updated successfully.',
            showClass: { popup: 'animate__animated animate__zoomIn' },
            timer: 2000,
            showConfirmButton: false
          });
          this.editMode = false;
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Hmm...',
            text: 'Something unexpected happened.',
            showClass: { popup: 'animate__animated animate__tada' }
          });
        }
      });
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'animate__animated animate__fadeInDown' },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this.authService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have been logged out successfully.',
          showClass: { popup: 'animate__animated animate__bounceIn' },
          timer: 2000,
          showConfirmButton: false
        }).then(() => this.router.navigate(['/login']));
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
