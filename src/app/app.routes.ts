import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Multiverso Explorer',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: ':universe',
    title: 'Archivo de personajes',
    loadComponent: () =>
      import('./pages/character-list/character-list.component').then(
        (m) => m.CharacterListComponent,
      ),
  },
  {
    path: ':universe/:id',
    title: 'Detalle del personaje',
    loadComponent: () =>
      import('./pages/character-detail/character-detail.component').then(
        (m) => m.CharacterDetailComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
