import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
//Esta classe fica acessível para todo o aplicativo
//Seja qual tela for
export class AppComponent {
  constructor() {
    const perfil = localStorage.setItem("getMestres:perfil", "cliente")
  }
}

