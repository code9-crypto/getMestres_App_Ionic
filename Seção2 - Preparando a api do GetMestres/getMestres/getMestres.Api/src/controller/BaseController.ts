import { Request } from "express"
import { AppDataSource } from "../data-source"
import { BaseNotification } from "../entity/BaseNotification"
import { Repository } from "typeorm"

//Está sendo usada generics dentro desta classe, pois ela será base para todas as outras
//E irá aceitar qualquer classe que a chame
export abstract class BaseController<T> extends BaseNotification{

    private repository

    constructor(entity: any){
        //Para evitar o erro no construtor, apenas declare o super() dentro do construtor
        //para chamar o construtor da super classe
        super()
        this.repository =  AppDataSource.getRepository<T>(entity)
    }

    //Este controlador está acionando o GET
    async all() {
        return this.repository.find()
    }

    //Este controlador está acionando o GET com o paramêtro id
    async one(request: Request) {
        //O paramêtro vem como id, mas a busca no banco de dados a chave primaria está como uid
        const uid = request.params.id
        //para que a função findOne() funcione, será necessário incluir a claúsula where conforme abaixo        
        const user = await this.repository.findOne({
            where: {uid}
        })
        //Caso não encontre o usuário do id informado, será exibido esta mensagem
        if (!user) {
            return "unregistered user"
        }
        return user
    }

    //Este controlador está acionando o POST
    async save(model: any) {
        if( model.uid ){
            let _modelInDB = await this.repository.findOne(model.uid)
            if( _modelInDB ){
                Object.assign(_modelInDB, model)
            }
        }

        if( this.valid() ){
            return this.repository.save(model)
        }else{
            return{
                status: 400,
                errors: this.allNotifications
            }
        }
        
    }
    
    async apagaTudo(){
        await this.repository.delete({active: 1})
        return "Todos os dados foram apagados com sucesso"
    }
    
    async remove(req: Request){
        var texto = ""
        if( req.params.id ){
            const uid = req.params.id
            await this.repository.delete(uid)
            texto = "Usuári apagado com sucesso"
        }else{
            texto = "Informe o código do usuário para apagar"
        }
        
        return texto        
    }

    //Este controlador está acionando o DELETE com o paramêtro id
    async disable(request: Request) {
        let uid = request.params.id
        let model = await this.repository.findOne(uid)
        if( model ){
            model.deleted = true
        }
        return this.repository.save(model)
    }

    //Este é um método de encapsulamento que retorna o atributo
    //privado repository
    get repositoryMethod(): Repository<T>{
        return this.repository
    }
}