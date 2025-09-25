import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./main/main.component').then(m => m.MainComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'profile', loadComponent: () => import('./auth/profile/profile.component').then(m => m.ProfileComponent) },
  {path:  'places', loadComponent: () => import('./places/places.component').then(m => m.PlacesComponent)},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
