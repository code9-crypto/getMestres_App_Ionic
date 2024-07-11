import { AppDataSource } from "../data-source";
import { RequestsOrderAnswers } from "../entity/RequestsOrderAnswers";
import { BaseController } from "./BaseController";
import { Request }  from "express"

export class RequestsOrderAnswersController extends BaseController<RequestsOrderAnswers>{

    constructor(){
        super(RequestsOrderAnswers)
    }

    //Este método é uma sobrescrita do método da super classe
    async all(req: Request){
        let { orderUid } = req.params
        if( !orderUid ){
            return {
                status: 400,
                message: "Informe o código da requisição"
            }
        }
        
        return this.repositoryMethod.find({
            where:{
                requestOrder: {
                    uid: orderUid
                }
            }
        })
    }
    
    async save(req: Request){
        let requestOrderAnswer = <RequestsOrderAnswers>req.body
        let { orderUid } = req.params
        
        requestOrderAnswer.requestOrder = orderUid

        super.isRequired(requestOrderAnswer.answer, "Informe a resposta da pergunta")
        super.isRequired(requestOrderAnswer.question, "A questão precisa ser informada")
        //super.isRequired(requestOrderAnswer.requestOrder, "Informe a requisição")

        return super.save(requestOrderAnswer, req)
    }
}