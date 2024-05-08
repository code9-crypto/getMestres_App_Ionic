//Todas imports mesmo que não tenha a extensão do arquivo explícita, mas elas fazem referência aos arquivos .ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';


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
    SubcategoryComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'getMestres';
}
