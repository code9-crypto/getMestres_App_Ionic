import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonFabButton, IonIcon, IonFab } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { RequestOrderModel } from '../models/RequestOrderModel';
import { PipesModule } from 'src/pipes/pipe.module';
import { RouterLink } from '@angular/router';
import { OrderService } from 'src/services/order.service';
import { IOrders } from 'src/interfaces/IOrders';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.page.html',
  styleUrls: ['./solicitacoes.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonCard,
    IonCardTitle, 
    IonCardContent,
    IonCardSubtitle,
    IonFabButton, 
    IonIcon, 
    IonFab,
    PipesModule,
    RouterLink    
  ]
})
export class SolicitacoesPage implements OnInit {

  list: IOrders[] = []

  constructor(
    private orderSrv: OrderService
  ) { 
    addIcons({ add })
  }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){
    const { success, data } = await this.orderSrv.customerGetMyOrders()
    if( success ){
      this.list = data as IOrders[]
    }
  }

}
