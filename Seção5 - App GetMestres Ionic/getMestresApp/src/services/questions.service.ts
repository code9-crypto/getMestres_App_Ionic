import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { QuestionModel } from 'src/app/models/QuestionModel';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseService<QuestionModel> {

  constructor(public override http: HttpService) {
    super( 'question', http )
  }

  getAllQuestions(subCategoryUid: string){
    return this.http.get(`${environment.url_api}/subCategory/${subCategoryUid}/questions`)
  }
}
