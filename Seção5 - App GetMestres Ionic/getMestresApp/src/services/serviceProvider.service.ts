import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { BaseService } from "./base.service";
import { ServiceProviderModel } from "src/app/models/ServiceProviderModel";

@Injectable({ 
    providedIn: 'root' 
})

export class ServiceProviderService extends BaseService<ServiceProviderModel>{

    constructor(public override http: HttpService){
        super('serviceProvider', http)
    }

    changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string){
        return this.http.post(`${this.urlBase}/changePassword`, {currentPassword, newPassword, confirmNewPassword})
    }
}
