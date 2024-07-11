import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButton, IonButtons, IonLabel, IonList, IonItem, IonItemDivider, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/services/order.service';
import { IOrders } from 'src/interfaces/IOrders';
import { IOrderAnswers } from 'src/interfaces/IOrderAnswers';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-visualizar-minha-solicitacao',
  templateUrl: './visualizar-minha-solicitacao.page.html',
  styleUrls: ['./visualizar-minha-solicitacao.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButton, 
    IonButtons, 
    IonLabel, 
    IonList, 
    IonItem, 
    IonItemDivider,
    IonIcon
  ]
})
export class VisualizarMinhaSolicitacaoPage implements OnInit {

  order!: IOrders
  answers: IOrderAnswers[] = []

  constructor(
    private active: ActivatedRoute,
    private orderSrv: OrderService,
    private navCtrl: NavController
  ) { addIcons ({ arrowBack }) }

  ngOnInit() {
    this.active.params.subscribe(p => this.getOrder(p['id']))
  }

  async getOrder(uid: string){
    const orderResult = await this.orderSrv.getById(uid)
    if( orderResult.success ){
      this.order = orderResult.data as IOrders
    }

    const answerResult = await this.orderSrv.getAllAnswers(uid)
    if(answerResult.success){
      this.answers = answerResult.data as IOrderAnswers[]
    }
  }

  voltar(){
    this.navCtrl.back()
  }

}
