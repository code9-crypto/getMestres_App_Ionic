import { RequestsOrder } from "../entity/RequestsOrder";
import { RequetsStatus } from "../entity/enum/RequestsStatus";
import { BaseController } from "./BaseController";
import { Request } from "express"
import { Customer } from "../entity/Customer"

export class RequestsOrderController extends BaseController<RequestsOrder>{
    constructor(){
        super(RequestsOrder, false)
    }

    async save(req: Request){
        const order = <RequestsOrder>req.body        
        order.customer = new Customer()
        order.customer.uid = req.userAuth.uid

        super.isRequired(order.title, "Informe o título do seu pedido")
        super.isRequired(order.description, "Informe o que precisa")
        super.isRequired(order.customer, "Preciso saber quem é você")
        super.isRequired(order.longlat, "Preciso saber onde você está")
        super.isRequired(order.subCategory, "Informe a subCategoria do pedido")

        //Verificando se o usuário já não tem uma requisição
        //Se não tiver, então o status da requisição será 1(pendente)
        if( !order.uid ){
            order.statusOrder = RequetsStatus.pending
        }

        return super.save(order, req)
    }
}