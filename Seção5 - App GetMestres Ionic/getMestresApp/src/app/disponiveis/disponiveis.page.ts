import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { PipesModule } from 'src/pipes/pipe.module';
import { OrderService } from 'src/services/order.service';
import { IOrders } from 'src/interfaces/IOrders';

@Component({
  selector: 'app-disponiveis',
  templateUrl: './disponiveis.page.html',
  styleUrls: ['./disponiveis.page.scss'],
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
export class DisponiveisPage implements OnInit {

  list: IOrders[] = []

  constructor(
    private orderSrv: OrderService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  //Este método é executado toda vez que entrar na página
  //em questão
  ionViewWillEnter(){
    this.loadData()
  }

  async loadData(){    
    const { success, data } = await this.orderSrv.getOrdersAvailable()
    if( success ){
      this.list = data as IOrders[]
    }    
  }

}
