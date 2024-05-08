import { Component } from '@angular/core';
import { CardsDashboardComponent } from "../../components/cards-dashboard/cards-dashboard.component";
import { PedidosPendentesComponent } from "../../components/pedidos-pendentes/pedidos-pendentes.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CardsDashboardComponent, PedidosPendentesComponent]
})
export class HomeComponent {

}
