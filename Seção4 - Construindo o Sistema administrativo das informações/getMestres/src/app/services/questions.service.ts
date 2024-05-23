import { Injectable } from "@angular/core"
import { BaseService } from "../base/base.service"
import { HttpService } from "./http.service"
import { ISelect } from "../interfaces/ISelect"

@Injectable({
    providedIn: 'root'
})

export class QuestionsService extends BaseService<any>{

    constructor(
        public override http: HttpService
    ){
        super('question', http)
    }

    //este método irá fazer a conversão dos números da coluna TIPO
    //para texto
    public static getQuestionsType(): Array<ISelect>{
        return [
            {value: 1, label: 'Texto'},
            {value: 2, label: 'Date'},
            {value: 3, label: 'Select'},
            {value: 4, label: 'Memo'}
        ]
    }
}