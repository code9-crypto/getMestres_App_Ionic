import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<any>{

  constructor(public override http: HttpService) { 
    super('category',http)
  }
  
}
