import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButtons, IonButton, IonLabel, IonIcon, IonItem, IonList, IonItemDivider } from '@ionic/angular/standalone';
import { IOrders } from 'src/interfaces/IOrders';
import { IOrderAnswers } from 'src/interfaces/IOrderAnswers';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/services/order.service';
import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

declare var google: any

@Component({
  selector: 'app-visualizar-solicitacao',
  templateUrl: './visualizar-solicitacao.page.html',
  styleUrls: ['./visualizar-solicitacao.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButtons, 
    IonButton, 
    IonLabel, 
    IonIcon, 
    IonItem, 
    IonList, 
    IonItemDivider
  ]
})
export class VisualizarSolicitacaoPage implements OnInit {
  order!: IOrders
  answers: IOrderAnswers[] = []
  map: any

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
      const geo: number[] = this.order.longlat.split(';').map( x => parseFloat(x) )
      this.populateMap(geo[1], geo[0])
    }

    const answerResult = await this.orderSrv.getAllAnswers(uid)
    if(answerResult.success){
      this.answers = answerResult.data as IOrderAnswers[]
    }
  }

  voltar(){
    this.navCtrl.back()
  }

  populateMap(lat: any, lng: any){
    const point = { lat, lng }
    const start = { lat: -34.397, lng: 150.644 }
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: start,
      zoom: 13,
      disableDefaultUI: true
    })
    setTimeout(() => {
      this.map.setCenter(point)
      const maker = new google.maps.Marker({
        position: point,
        map: this.map
      })
    }, 1000)
  }

}
