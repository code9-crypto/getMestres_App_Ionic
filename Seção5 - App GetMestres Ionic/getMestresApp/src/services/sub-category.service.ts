import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { SubCategoryModel } from 'src/app/models/SubCategoryModel';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService<SubCategoryModel> {

  constructor( public override http: HttpService ) {
    super('subCategory', http)
  }

  getAllByCategory(categoryUid: string){
    return this.http.get(`${environment.url_api}/category/${categoryUid}/subcategories`)
  }

}
