import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-visualizar-minha-solicitacao',
  templateUrl: './visualizar-minha-solicitacao.page.html',
  styleUrls: ['./visualizar-minha-solicitacao.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VisualizarMinhaSolicitacaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
