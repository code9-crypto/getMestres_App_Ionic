import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceProviderModel } from '../model/ServiceProviderModel';
import { HttpService } from './http.service';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends BaseService<ServiceProviderModel>{

  constructor(public override http: HttpService) {
    super('serviceProvider', http)
  }

  createServiceProvider(providerModel: ServiceProviderModel){
    return this.http.post(`${enviroment.url_api}/serviceProvider/create`, providerModel)
  }
}
