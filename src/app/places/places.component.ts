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
  const userId = localStorage.getItem('user_id');
  this.http.post<any>(`${environment.apiUrl}/show_place/`, { user_id: userId }).subscribe({
    next: (response) => {
      this.places = response.places;
      console.log('Places loaded:', this.places);
    },
    error: (err) => {
      console.error('Error fetching places:', err);
    }
  });
}

  
}
