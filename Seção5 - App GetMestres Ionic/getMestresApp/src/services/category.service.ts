import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from './base.service';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel> {

  constructor(public override http: HttpService) {
    super('category', http)
  }
}
