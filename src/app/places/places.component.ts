import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    //  get user object from localStorage
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const userId = user ? user.id : null;

    console.log('User ID:', userId);  // should show a valid number

    if (!userId) {
      console.error('User ID not found. Please log in again.');
      return;
    }

    //  send user_id in request
    this.http.post<any>(`${environment.apiUrl}/show_place/`, { user_id: userId }).subscribe({
      next: (response) => {
        console.log('Full API Response:', response);
        this.places = response.places || [];
        console.log('Places loaded:', this.places);
      },
      error: (err) => {
        console.error('Error fetching places:', err);
      }
    });
  }
}
