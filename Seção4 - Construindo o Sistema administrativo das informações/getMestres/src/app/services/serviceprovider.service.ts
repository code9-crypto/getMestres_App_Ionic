import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
})

export class ServiceProviderService extends BaseService<any>{
    
    constructor(public override http: HttpService){
        super('serviceProvider', http)
    }
    
}