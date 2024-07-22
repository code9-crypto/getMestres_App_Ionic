//Todas imports mesmo que não tenha a extensão do arquivo explícita, mas elas fazem referência aos arquivos .ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { PedidosPendentesComponent } from './components/pedidos-pendentes/pedidos-pendentes.component';
import { CardsDashboardComponent } from "./components/cards-dashboard/cards-dashboard.component";
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/paginator-intl';
import { Subscription } from 'rxjs';
import { IMenu } from './interfaces/IMenu';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [    
    RouterOutlet, 
    //Componentes do toolbar
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    //Componentes do corpo da página
    MatSidenavModule,
    MatListModule,
    //Componentes dos pedidos pendentes
    MatTableModule,
    PedidosPendentesComponent,
    CardsDashboardComponent,
    HttpClientModule,
    NgxSpinnerModule,
    SubcategoriesComponent,
    CommonModule,
    //Navegaçãp
    RouterLink
  ],
  providers: [{
    provide: MatPaginatorIntl, useValue: getPaginatorIntl()
  }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  isLogged: boolean = false
  title = 'getMestres';
  subScrip!: Subscription
  //Este atributo foi criado para gerenciar, de forma centralizada, os menus
  //Este atributo também está tipando um array com a inteface IMenu
  menu: Array<IMenu> = new Array<IMenu>
  privilege = localStorage.getItem('privilege')


  constructor(
    private userService: UserService,
    private router: Router
  ){

  }

  //Este método faz com que, toda codificação dentro dele
  //Carregará automaticamente assim que a aplicação for iniciada
  ngOnInit(): void{
    this.isLogged = this.userService.isStaticLogged
    this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged            
    })
    
    //Estes são os itens do menu gerenciados de forma centralizada(abaixo)
    this.menu.push({
      group: "Cadastros",
      items:[
        {icon: 'bookmark', label: 'Categorias', url:'/categories'},
        {icon: 'bookmark_border', label: 'SubCategorias', url:'/subCategories'},
        {icon: 'assignment', label: 'Questões', url:'/questions'},
      ]
    })

    this.menu.push({
      group: 'Pessoas',
      items:[
        {icon: 'person', label: 'Prossionais', url:'/serviceProviders'},
        {icon: 'person_ping', label: 'Cliente', url:'/customers'}
      ]
    })

    this.menu.push({
      group: 'Segurança',
      items:[
        {icon: 'security', label: 'Usuários', url:'Users'}
      ]
    })
    //Estes são os itens do menu gerenciados de forma centralizada(acima)
  }

  logout(){
    this.isLogged = false
    localStorage.clear()
    this.router.navigateByUrl('/home')    
  }
}