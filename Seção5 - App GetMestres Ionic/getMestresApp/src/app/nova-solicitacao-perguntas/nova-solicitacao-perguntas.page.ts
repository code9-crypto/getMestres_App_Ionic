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
import { OrderService } from 'src/services/order.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertService } from 'src/services/alert.service';


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
    IonTextarea,
  ]
})
export class NovaSolicitacaoPerguntasPage implements OnInit {

  subCategory: SubCategoryModel = new SubCategoryModel()
  questions: Array<QuestionModel> = new Array<QuestionModel>()
  answers: any = {}
  request: RequestOrderModel  = new RequestOrderModel()

  constructor(
    private router: Router,
    private questionSrv: QuestionsService,
    private navCtrl: NavController,    
    private orderSrv: OrderService,
    private alertSrv: AlertService
    
  ) { addIcons({ arrowBack })  }

  ngOnInit() {
    try{
      const { extras } : any = this.router.getCurrentNavigation()
      if( extras && extras.state){
        this.subCategory = extras.state as SubCategoryModel
        this.loadData()        
      }else{
        this.navCtrl.navigateRoot('/tabs')
      }
    }catch(error){
      this.router.navigateByUrl('/tabs')
    }
  }

  async loadData(): Promise<void>{
    const result = await this.questionSrv.getAllQuestions(this.subCategory.uid)
    if( result.success ){
      this.questions = result.data as Array<QuestionModel>      
    }
  }

  voltar(){
    this.navCtrl.back()
  }

  getOptions(questions: QuestionModel){
    return questions.options.split(",").map(o => o.trim())
  }

  async send(){
    try{
      //Para usar o geolocation, não precisa tipar uma variável para usa-lo
      //Pode usa-la apenas importando-a e usando-a diretamente
      const { coords } = await Geolocation.getCurrentPosition()
      this.request.longlat = `${coords.latitude};${coords.longitude}`
      this.request.subCategory = this.subCategory.uid      
      const { success, data } = await this.orderSrv.post(this.request)
      if( success ){      
        for (const key in this.answers) {        
          await this.orderSrv.sendAnswers({
            answer: this.answers[key],
            question: key,
            requestOrder: data.uid
          })          
        }
        //Pegando os valores do campos para depois deixa-los em branco
        //let titulo: any = document.querySelector('ion-input[name="titulo"]')

        //Apresentando mensagem de sucesso ao cadastrar
        let success = `Informação cadastrada com sucesso`
        this.alertSrv.alert('Sucesso', success)
        this.navCtrl.back()
        this.navCtrl.back()
      }
    }catch(error){
      console.log('erro', error)
    }    
  }
}
