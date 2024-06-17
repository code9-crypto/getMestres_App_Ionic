import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs', //1º path
    component: TabsPage,
    children: [
      {
        path: 'tabDisponiveis', //2º path
        loadComponent: () =>
          //Este é onde se encontra a página
          import('../disponiveis/disponiveis.page').then((m) => m.DisponiveisPage),
      },            
      {
        path: 'tabPerfil',
        loadComponent: () =>
          import('../perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: 'tabAceito',
        loadComponent: () =>
          import('../aceitos/aceitos.page').then((m) => m.AceitosPage),
      },
      {
        path: 'tabConcluido',
        loadComponent: () =>
          import('../concluidos/concluidos.page').then((m) => m.ConcluidosPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tabDisponiveis',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tabDisponiveis',
    pathMatch: 'full',
  },
];
