import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { RequestOrderModel } from "src/app/models/RequestOrderModel";
import { BaseService } from "./base.service";
import { RequestOrderAnswerModel } from "src/app/models/RequestOrderAnswerModel";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService extends BaseService<RequestOrderModel>{
    constructor( public override http: HttpService ){
        super('requests', http)
    }
    
    sendAnswers(answer: RequestOrderAnswerModel){
        return this.http.post(`${environment.url_api}/requestsAnswer`, answer)
    }

    getOrdersAvailable(){
        return this.http.get(`${environment.url_api}/serviceProvider/orders/availables`)
    }

    customerGetMyOrders(){
        return this.http.get(`${environment.url_api}/customer/my/orders`)
    }

    getAllAnswers(orderUid: string){
        return this.http.get(`${environment.url_api}/requestsAnswer/${orderUid}/all`)
    }

    getMyOrders(status: number = 2){
        return this.http.get(`${environment.url_api}/serviceProvider/orders/my?status=${status}`)
    }

    accept(uid: string){
        return this.http.put(`${environment.url_api}/${uid}/accept`, {})
    }

    done(uid: string){
        return this.http.put(`${environment.url_api}/${uid}/done`, {})
    }
}