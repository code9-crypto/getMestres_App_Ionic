import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonButtons, IonButton,  IonIcon, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SubCategoryModel } from '../models/SubCategoryModel';
import { QuestionsService } from 'src/services/questions.service';
import { QuestionModel } from '../models/QuestionModel';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { RequestOrderModel } from '../models/RequestOrderModel';


@Component({
  selector: 'app-nova-solicitacao-perguntas',
  templateUrl: './nova-solicitacao-perguntas.page.html',
  styleUrls: ['./nova-solicitacao-perguntas.page.scss'],
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
    IonIcon,
    IonList, 
    IonItem,
    IonLabel, 
    IonInput,
    IonSelect, 
    IonSelectOption,
    IonDatetime,
    IonTextarea    
  ]
})
export class NovaSolicitacaoPerguntasPage implements OnInit {

  subCategory: SubCategoryModel = new SubCategoryModel()
  questions: Array<QuestionModel> = new Array<QuestionModel>()
  answers: any = []
  request: RequestOrderModel = new RequestOrderModel()

  constructor(
    private router: Router,
    private questionSrv: QuestionsService,
    private navCtrl: NavController,
    private geolocation: GeolocationCoordinates
    
  ) { addIcons({ arrowBack })  }

  ngOnInit() {

    try{      
      this.subCategory = this.router.getCurrentNavigation()?.extras.state as SubCategoryModel
      this.loadData()
    }catch(error){
      this.router.navigateByUrl('/tabs')
    }

  }

  async loadData(): Promise<void>{
    const result = await this.questionSrv.getAllQuestions(this.subCategory.uid)
    if( result.success ){
      this.questions = result.data as Array<QuestionModel>
      

      console.log(this.questions)
    }
  }

  voltar(){
    this.navCtrl.back()
  }

  getOptions(questions: QuestionModel){
    return questions.options.split(",").map(o => o.trim())
  }

  async send(){
    const long = await this.geolocation.longitude
    const lat = await this.geolocation.latitude
    this.request.longlat = `${long};${lat}`
    this.request.subCategory = this.subCategory.uid
  }

}
