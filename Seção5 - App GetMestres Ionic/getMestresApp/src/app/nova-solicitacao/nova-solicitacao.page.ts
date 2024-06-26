import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, NavController, IonIcon} from '@ionic/angular/standalone';
import { CategoryModel } from '../models/CategoryModel';
import { CategoryService } from 'src/services/category.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';


@Component({
  selector: 'app-nova-solicitacao',
  templateUrl: './nova-solicitacao.page.html',
  styleUrls: ['./nova-solicitacao.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonGrid,
    IonRow, 
    IonCol,
    IonButton,
    IonBackButton,
    IonIcon
  ]
})
export class NovaSolicitacaoPage implements OnInit {

  categories: Array<CategoryModel> = new Array<CategoryModel>()

  constructor(
    private categorySrv: CategoryService,
    private router: Router,
    private navCtrl: NavController
  ) { addIcons({ arrowBack }) }

  ngOnInit() {
    this.loadData()
  }

  async loadData(): Promise<void>{
    const result = await this.categorySrv.getAll()
    if( result.success ){
      this.categories = result.data as Array<CategoryModel>
    }
  }

  selectCategory(category: CategoryModel): void {
    this.router.navigate(['/tabs/nova-solicitacao-sub-categoria'], { state: category })
  }

  //Esta é a função para voltar as telas
  voltar(){
    this.navCtrl.back()    
  }

}
