import { IResultHttp } from "../interfaces/IResultHttp";
import { HttpService } from "./http.service";
import { environment } from "../environments/environment";

export abstract class BaseService<T>{
    
    urlBase: string = ""

    constructor(
        public url: string, 
        public http: HttpService) {
        this.urlBase = `${environment.url_api}/${this.url}`
    }

    public getAll(): Promise<IResultHttp>{
        return this.http.get(this.urlBase)
    }

    public getById(uid: string): Promise<IResultHttp>{
        return this.http.get(`${this.urlBase}/${uid}`)
    }

    public post(model: T): Promise<IResultHttp>{
        return this.http.post(this.urlBase, model)
    }

    public put(model: T, uid: string): Promise<IResultHttp>{
        return this.http.put(`${this.urlBase}/${uid}`, model)
    }

    public delete(uid: string): Promise<IResultHttp>{
        return this.http.delete(`${this.urlBase}/${uid}`)
    }

}