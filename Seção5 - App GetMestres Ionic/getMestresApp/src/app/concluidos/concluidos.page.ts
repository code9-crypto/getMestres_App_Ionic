import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IOrders } from 'src/interfaces/IOrders';
import { PipesModule } from 'src/pipes/pipe.module';
import { OrderService } from 'src/services/order.service';
import { RequestStatus } from '../models/enums/RequestStatus';

@Component({
  selector: 'app-concluidos',
  templateUrl: './concluidos.page.html',
  styleUrls: ['./concluidos.page.scss'],
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
    IonCardSubtitle, 
    IonCardContent,
    RouterLink,
    PipesModule
  ]
})
export class ConcluidosPage implements OnInit {

  list: IOrders[] = []

  constructor(
    private orderSrv: OrderService
  ) { }

  ngOnInit() {
    
  }

  //Este método é executado toda vez que entrar na página
  //em questão
  ionViewWillEnter(){
    this.loadData()
  }

  async loadData(){    
    const { success, data } = await this.orderSrv.getMyOrders(RequestStatus.finished)
    if( success ){
      this.list = data as IOrders[]
    }    
  }
}
