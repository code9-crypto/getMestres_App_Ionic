import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-disponiveis',
  templateUrl: './disponiveis.page.html',
  styleUrls: ['./disponiveis.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DisponiveisPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
