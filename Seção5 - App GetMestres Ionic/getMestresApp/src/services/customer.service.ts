import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { BaseService } from "./base.service";
import { CustomerModel } from "src/app/models/CustomerModel";
import { environment } from "src/environments/environment";

@Injectable({ 
    providedIn: 'root' 
})

export class CustomerService extends BaseService<CustomerModel>{

    constructor(public override http: HttpService){
        super('customer', http)
    }

    changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string){
        return this.http.post(`${this.urlBase}/changePassword`, {currentPassword, newPassword, confirmNewPassword})
    }
}
