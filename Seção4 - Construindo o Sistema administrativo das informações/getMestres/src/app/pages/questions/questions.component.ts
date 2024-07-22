import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QuestionsService } from '../../services/questions.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import alert from 'sweetalert2'
import { QuestionModel } from '../../model/QuestionModel';
import { Constants } from '../../shared/constants';
import { QuestionTypePipe } from "../../pipes/question-type.pipe";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-questions',
    standalone: true,
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.scss',
    imports: [
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      RouterLink,
      MatPaginatorModule,
      MatIconModule,
      QuestionTypePipe,
      MatSnackBarModule
    ]
})
export class QuestionsComponent implements OnInit {
  
  columns: string[] = ["Código", "Questão", "Tipo", "SubCategoria", "uid"]
  dataSource!: MatTableDataSource<QuestionModel>
  //Este é responsável por fazer a páginação na tela
  @ViewChild(MatPaginator) paginator!: MatPaginator

  privilege = localStorage.getItem('privilege')  
  
  constructor( 
    private questionSrv: QuestionsService,
    private matSnack: MatSnackBar
  ){}
  
  async ngOnInit(){
    /*const question = await this.questionSrv.getAll()
    console.log('passei', question);
    this.dataSource = question.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        question: it.question,
        options: it.options
      };
    });*/
    this.bind()
  }

  //Este método filtra e traz apenas os valores que faz referência
  //ao que foi digitado
  filter(value: string){
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }

  async bind(): Promise<void>{
    const questions = await this.questionSrv.getAll()
    this.dataSource = new MatTableDataSource(questions.data)
    this.dataSource.paginator = this.paginator
  }

  //Este função irá fazer a deleção
  async delete(model: QuestionModel): Promise<void>{
    const options: any = {
      //Esta forma de codificação, irá herdar
      //todas propriedades de Constants.confirm_alert_options (a qual foi importada)
      //E a propriedade text, foi criada neste instante
      ...Constants.confirm_alert_options, text: `Deseja realmente excluir a SubCategoria ${model.question}`
    }
    const { value } = await alert.fire(options)
    if( value ){
      const result = await this.questionSrv.delete(model.uid)
      if( result.success ){
        this.matSnack.open('Deletado com sucesso', undefined, { duration: 3000 })
        this.bind()
      }
    }
  }
}
