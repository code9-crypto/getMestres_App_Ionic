import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SubCategoryModel } from '../models/SubCategoryModel';
import { QuestionsService } from 'src/services/questions.service';
import { QuestionModel } from '../models/QuestionModel';

@Component({
  selector: 'app-nova-solicitacao-perguntas',
  templateUrl: './nova-solicitacao-perguntas.page.html',
  styleUrls: ['./nova-solicitacao-perguntas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NovaSolicitacaoPerguntasPage implements OnInit {

  subCategory: SubCategoryModel = new SubCategoryModel()
  questions: Array<QuestionModel> = new Array<QuestionModel>()
  constructor(
    private router: Router,
    private questionSrv: QuestionsService
  ) { }

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

}
