import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  first_name = '';
  last_name = '';
  mobile_number = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const newUser = {
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      mobile_number: this.mobile_number,
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: (res) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed');
      }
    });
  }
}
