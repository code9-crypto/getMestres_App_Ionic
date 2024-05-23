import { Pipe, PipeTransform } from '@angular/core';
import { QuestionsService } from '../services/questions.service';

@Pipe({
  name: 'questionType',
  standalone: true
})
//Esta classe é utilizada para fazer transformação de dados
//Ela irá receber uma coisa e irá converter para outra coisa mais legível e compreensível
export class QuestionTypePipe implements PipeTransform {

  transform(value: number): string | undefined {
    try{
      //Este comando está retornando um array
      return QuestionsService.getQuestionsType().find( x => x.value == value)?.label
    }catch(error){
      return ''
    }
  }

}
