import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceProviderModel } from '../model/ServiceProviderModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends BaseService<ServiceProviderModel>{

  constructor(public override http: HttpService) {
    super('serviceProvider', http)
   }
}
