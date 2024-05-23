import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuestionModel } from '../../model/QuestionModel';
import { SubCategoryModel } from '../../model/SubCategoryModel';
import { QuestionService } from '../../services/question.service';
import { SubCategoryService } from '../../services/subCategory.service';
import { ISelect } from '../../interfaces/ISelect';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  model: QuestionModel = new QuestionModel()
  subCategories!: Array<SubCategoryModel>
  questionsType!: Array<ISelect>

  constructor(
    private subCategorySrv: SubCategoryService,
    private questionSrv: QuestionService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute

  ){}
  
  ngOnInit(): void {
    //este método fica ouvindo o que é recebido por paramêtro pela URL
    //Caso o paramêtro no id seja igual a new, então será aberta a tela de com os campos vazios para cadastrar nova subcategoria
    //Caso o paramêtro venha com um código, então a tela será aberta com os campos já preenchidos para apenas alteração
    this.active.params.subscribe( p => this.getId(p['id']))
    this.questionsType = QuestionsService.getQuestionsType()
    this.bindSubCategories()
  }

  async bindSubCategories(): Promise<void>{
    const result = await this.subCategorySrv.getAll()
    if( result.success ){
      this.subCategories = result.data as Array<SubCategoryModel>
    }
  }

  //Este método que verifica se o vem com id new ou vem com o código
  async getId(uid: string): Promise<void>{
    if( uid == 'new' ){
      return
    }
    const result = await this.questionSrv.getById(uid)
    this.model = result.data as QuestionModel
  }

  async save(): Promise<void>{
    const result = await this.questionSrv.post(this.model)
    if( result.success ){
      this.matSnack.open('Pergunta salva com sucesso', undefined, { duration: 3000 })
      this.router.navigateByUrl('/questions')
    }
  }

}
