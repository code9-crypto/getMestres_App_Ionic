import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from './http.service';
import { UserModel } from '../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserGetAllService extends BaseService<UserModel> {

  constructor(public override http: HttpService) {
    super('users', http)
   }
}
