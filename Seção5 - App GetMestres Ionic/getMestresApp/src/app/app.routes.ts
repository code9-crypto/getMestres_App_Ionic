import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'disponiveis',
    loadComponent: () => import('./disponiveis/disponiveis.page').then( m => m.DisponiveisPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'aceitos',
    loadComponent: () => import('./aceitos/aceitos.page').then( m => m.AceitosPage)
  },
  {
    path: 'concluidos',
    loadComponent: () => import('./concluidos/concluidos.page').then( m => m.ConcluidosPage)
  },
];
