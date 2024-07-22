import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "./http.service";
import { IResultHttp } from "../interfaces/IResultHttp";
import { enviroment } from "../enviroments/enviroment";
import { Observable, Subject } from "rxjs";
import { UserModel } from "../model/UserModel";


@Injectable({
    providedIn: 'root'
})
export class UserGetAllService extends BaseService<UserModel>{

    constructor(public override http: HttpService){
        super('users', http)
    }

}