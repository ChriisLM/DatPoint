import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: '',
  loadComponent: () => import('./pages/landing-page/landing-page.component'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
    children: [
      { path: '', loadComponent: () => import('./features/dashboard/pages/home-page/home-page.component')},
      { path: 'recent', loadComponent: () => import('./features/dashboard/pages/recent-page/recent-page.component')},
      { path: 'favorite', loadComponent: () => import('./features/dashboard/pages/favorite-page/favorite-page.component')},
      { path: 'search', loadComponent: () => import('./features/dashboard/pages/result-search-page/result-search-page.component')},
      { path: 'type/:type', loadComponent: () => import('./features/dashboard/pages/resource-list-page/resource-list-page.component')
      },
      { path: '**', redirectTo: ''}
    ]
  },
  { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component') },
  { path: 'register', loadComponent: () => import('./pages/register-page/register-page.component') },
  {
    path: '**',
    redirectTo: ''
  }
];
