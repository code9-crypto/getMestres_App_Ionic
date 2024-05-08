import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { QuestionService } from '../../services/questions.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit {
  
  columns: string[] = ["Código", "Questão", "Opções"]
  dataSource!: MatTableDataSource<ICategories>
  
  constructor( private questionSrv: QuestionService ){
  }
  
  async ngOnInit(){
    const question = await this.questionSrv.getAll()
    console.log('passei', question);
    this.dataSource = question.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        question: it.question,
        options: it.options
      };
    });
  }
}
