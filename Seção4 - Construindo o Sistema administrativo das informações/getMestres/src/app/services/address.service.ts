import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpService) { }

  getAllStates(){
    return this.http.get(`${enviroment.url_api}/address`)
  }

  getAllCities(state: string){
    return this.http.get(`${enviroment.url_api}/address/${state}`)
  }
}
