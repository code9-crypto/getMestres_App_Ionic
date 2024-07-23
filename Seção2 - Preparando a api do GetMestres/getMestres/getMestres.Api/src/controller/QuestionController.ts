import { Question } from "../entity/Question";
import { QuestionType } from "../entity/enum/QuestionType";
import { BaseController } from "./BaseController";
import { Request } from "express"

export class QuestionController extends BaseController<Question>{
    constructor(){
        super(Question, true)
    }

    //Sobrescrita de método
    async save(request: Request){
        let question = <Question>request.body

        //O super está sendo chamado, pois é para que a validação seja feita na superclasse, não na classe local
        super.isRequired(question.question, "A pergunta é obrigatória")
        super.isRequired(question.type, "O tipo da pergunta é obrigatório")
        super.isRequired(question.subCategory, "Informe a SubCategoria da pergunta")

        //Pegando um valor em string e convertendo para int
        let questionTypeInt = parseInt(question.type.toString())
        if(  question.type && questionTypeInt === QuestionType.Select ){
            super.isRequired(question.options, "Para o tipo Selecione, você deve informar quais são as opções")
        }

        return super.save(question, request)
    }

    //Sobrescrita de método
    // async all(req: Request){
    //     return this.repositoryMethod.find({
    //         where: {
    //             deleted: false
    //         }
    //     })
    // }
}