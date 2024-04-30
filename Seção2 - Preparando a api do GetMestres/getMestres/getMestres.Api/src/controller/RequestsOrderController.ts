import { RequestsOrder } from "../entity/RequestsOrder";
import { RequetsStatus } from "../entity/enum/RequestsStatus";
import { BaseController } from "./BaseController";
import { Request } from "express"

export class RequestsOrderController extends BaseController<RequestsOrder>{
    constructor(){
        super(RequestsOrder)
    }

    async save(req: Request){
        let request = <RequestsOrder>req.body

        super.isRequired(request.title, "Informe o título do seu pedido")
        super.isRequired(request.description, "Informe o que precisa")
        super.isRequired(request.customer, "Preciso saber quem é você")
        super.isRequired(request.longlat, "Preciso saber onde você está")

        //Verificando se o usuário já não tem uma requisição
        //Se não tiver, então o status da requisição será 1(pendente)
        if( !request.uid ){
            request.statusOrder = RequetsStatus.pending
        }

        return super.save(request, req)
    }
}