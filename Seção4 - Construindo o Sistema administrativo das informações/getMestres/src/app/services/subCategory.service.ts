import { BaseService } from "../base/base.service";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SubCategoryService extends BaseService<any>{

    constructor(public override http: HttpService){
        super('subCategory', http)
    }
    
}