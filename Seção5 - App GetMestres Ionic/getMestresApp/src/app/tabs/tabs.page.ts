import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnDestroy, OnInit, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, NavController } from '@ionic/angular/standalone';
//Para adicionar os ícones, deve-se importar essas duas libs abaixo
import { addIcons } from 'ionicons';
import { bookOutline, copy, person, checkmark, book } from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { Constants } from 'src/shared/constants';

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
export class TabsPage implements OnInit, OnDestroy{
  public environmentInjector = inject(EnvironmentInjector);
  //As variáveis contidas neste arquivo, também são acessíveis na página HTML
  //perfil = localStorage.getItem(Constants.keyStore.profile)

  perfil!: string
  subProfile!: Subscription

  constructor(
    private userSrv: UserService,
    private navCtrl: NavController
  ) {
    //Para adicionar os ícones é desta forma
    addIcons({ bookOutline, copy, person, checkmark, book });
  }

  ngOnInit(): void {
    this.subProfile = this.userSrv.ProfileAsync.subscribe(prof => { 
      this.perfil = prof
      switch(prof){
      case 'customer':
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs/tabSolicitacoes');  
        }, 100)        
        break;
      case 'serviceProvider':
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs/tabDisponiveis');  
        }, 100)        
        break;
      }
  } );
    if (!this.userSrv.IsAuth) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnDestroy(): void {
    if (this.subProfile) {
      this.subProfile.unsubscribe();
    }
  }

  

  
}
