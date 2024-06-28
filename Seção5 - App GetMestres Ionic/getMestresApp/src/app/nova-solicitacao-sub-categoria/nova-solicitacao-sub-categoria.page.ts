import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButtons, IonButton, IonIcon, NavController } from '@ionic/angular/standalone';
import { CategoryModel } from '../models/CategoryModel';
import { SubCategoryModel } from '../models/SubCategoryModel';
import { SubCategoryService } from 'src/services/sub-category.service';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';


@Component({
  selector: 'app-nova-solicitacao-sub-categoria',
  templateUrl: './nova-solicitacao-sub-categoria.page.html',
  styleUrls: ['./nova-solicitacao-sub-categoria.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    RouterLink,
    IonGrid, 
    IonCol, 
    IonRow,
    IonButtons,
    IonButton,     
    IonIcon
  ]
})
export class NovaSolicitacaoSubCategoriaPage implements OnInit {

  category: CategoryModel = new CategoryModel();
  subCategories: Array<SubCategoryModel> = new Array<SubCategoryModel>();

  constructor(
    private router: Router,
    private subCategorySrv: SubCategoryService,
    private navCtrl: NavController
    

  ) { addIcons({ arrowBack }) }

  //Este método é o que inicializa assim todos os métodos assim que é carregado
  ngOnInit() {

    try{      
      this.category = this.router.getCurrentNavigation()?.extras.state as CategoryModel
      this.loadData()
    }catch(error){
      this.router.navigateByUrl('/tabs')
    }

  }

  //Este função carrega todas as sub-categorias com base na categoria
  async loadData(): Promise<void>{
    const result = await this.subCategorySrv.getAllByCategory(this.category.uid)
    if( result.success ){
      this.subCategories = result.data as Array<SubCategoryModel>      
    }
  }

  //Este método abri o formulário das perguntas com base na sub-categoria
  selectSubCategory(subCategory: SubCategoryModel){
    this.router.navigate(['/tabs/nova-solicitacao-perguntas'], { state: subCategory })    
  }

  //Função do botão voltar
  voltar(){
    this.navCtrl.back()
  }

}
