import { Injectable } from "@angular/core";
import { BaseService } from "../base/base.service";
import { HttpService } from "./http.service";
import { IResultHttp } from "../interfaces/IResultHttp";
import { enviroment } from "../enviroments/enviroment";
import { Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<any>{

    private loginSubject = new Subject<boolean>

    constructor(public override http: HttpService){
        super('users', http)
    }

    login(email: string, password: string): Promise<IResultHttp>{
        return this.http.post(`${enviroment.url_api}/users/auth`, { email, password })
    }

    configureLogin(t: any): void{
        const { token, user } = t.data
        localStorage.setItem('getMestres:token', token)
        localStorage.setItem('getMestres:user', JSON.stringify(user))
        this.loginSubject.next(this.isStaticLogged)
    }

    get isLogged(): Observable<boolean>{
        return this.loginSubject.asObservable()
    }

    get isStaticLogged(): boolean{
        return !!localStorage.getItem('getMestres:token')
    }

    static get token(): string | null{
        return localStorage.getItem('getMestres:token')
    }

}