import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

//Pegando o valor da chave getMestres:perfil no localStorage
//E atribuindo a constante perfil
const perfil = localStorage.getItem('getMestres:perfil')


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
        path: 'tabSolicitacoes',
        loadComponent: () =>
          import('../solicitacoes/solicitacoes.page').then((m) => m.SolicitacoesPage),
      },
      {
        path: 'nova-solicitacao-sub-categoria',
        loadComponent: () => import('../nova-solicitacao-sub-categoria/nova-solicitacao-sub-categoria.page').then( m => m.NovaSolicitacaoSubCategoriaPage)
      },
      {
        path: 'tabAtendidas',
        loadComponent: () =>
          import('../atendidas/atendidas.page').then((m) => m.AtendidasPage),
      },
      {
        path: 'nova-solicitacao',
        loadComponent: () => 
          import('../nova-solicitacao/nova-solicitacao.page').then( m => m.NovaSolicitacaoPage)
      },
      {
        path: 'nova-solicitacao-perguntas',
        loadComponent: () => import('../nova-solicitacao-perguntas/nova-solicitacao-perguntas.page').then( m => m.NovaSolicitacaoPerguntasPage)
      },
      {
        path: '',
        //Caso a constante perfil tenha o valor profissional
        //então cairá aqui '/tabs/tabDisponiveis' que é do profissional
        //Se não, cairá aqui '/tabs/tabSolicitacoes' que é do cliente
        redirectTo: perfil == 'profissional' ? '/tabs/tabDisponiveis' : '/tabs/tabSolicitacoes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    //Caso a constante perfil tenha o valor profissional
    //então cairá aqui '/tabs/tabDisponiveis' que é do profissional
    //Se não, cairá aqui '/tabs/tabSolicitacoes' que é do cliente
    redirectTo: perfil == 'profissional' ? '/tabs/tabDisponiveis' : '/tabs/tabSolicitacoes',
    pathMatch: 'full',
  },
];
