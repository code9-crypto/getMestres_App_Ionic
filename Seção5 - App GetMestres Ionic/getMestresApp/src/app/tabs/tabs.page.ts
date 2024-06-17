import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
//Para adicionar os ícones, deve-se importar essas duas libs abaixo
import { addIcons } from 'ionicons';
import { bookOutline, copy, person, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    //Para adicionar os ícones é desta forma
    addIcons({ bookOutline, copy, person, checkmark });
  }
}
