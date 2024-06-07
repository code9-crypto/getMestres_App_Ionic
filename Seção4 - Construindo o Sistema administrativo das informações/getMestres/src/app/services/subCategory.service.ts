import { BaseService } from "../base/base.service";
import { enviroment } from "../enviroments/enviroment";
import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SubCategoryService extends BaseService<any>{

    constructor(public override http: HttpService){
        super('subCategory', http)
    }

    getAllByCategory(categoryUid: string){
        return this.http.get(`${enviroment.url_api}/category/${categoryUid}/subcategories`)
    }
    
}