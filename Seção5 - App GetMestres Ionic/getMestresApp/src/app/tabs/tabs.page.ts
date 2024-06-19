import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
//Para adicionar os ícones, deve-se importar essas duas libs abaixo
import { addIcons } from 'ionicons';
import { bookOutline, copy, person, checkmark, book } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonLabel,
    CommonModule
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  //As variáveis contidas neste arquivo, também são acessíveis na página HTML
  perfil = localStorage.getItem('getMestres:perfil')

  constructor() {
    //Para adicionar os ícones é desta forma
    addIcons({ bookOutline, copy, person, checkmark, book });
  }

  
}
