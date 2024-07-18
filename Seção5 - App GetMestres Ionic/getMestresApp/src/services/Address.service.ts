import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class AddressService{
    constructor( private http: HttpService){}

    getAllStates(){
        return this.http.get(`${environment.url_api}/address`)
    }

    getAllCities(state: string){
        return this.http.get(`${environment.url_api}/address/${state}`)
    }
}