import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { BaseService } from "./base.service";
import { CustomerModel } from "src/app/models/CustomerModel";

@Injectable({ 
    providedIn: 'root' 
})

export class CustomerService extends BaseService<CustomerModel>{

    constructor(public override http: HttpService){
        super('customer', http)
    }
}
