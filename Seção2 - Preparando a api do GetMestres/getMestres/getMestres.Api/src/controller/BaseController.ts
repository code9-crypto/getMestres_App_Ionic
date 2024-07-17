//OBS.: as imports de Request, Response e NextFunction, são variáveis de ambiente
import { Request } from "express"
import { AppDataSource } from "../data-source"
import { BaseNotification } from "../entity/BaseNotification"
import { Repository } from "typeorm"

//Está sendo usada generics dentro desta classe, pois ela será base para todas as outras
//E irá aceitar qualquer classe que a chame
export abstract class BaseController<T> extends BaseNotification{

    private repository
    private onlyRootController
    private erroRoot: any = {
        status: 401,
        message: "Você não está autorizado a executar esta funcionalidade"
    }

    constructor(entity: any, onlyRoot: boolean = false){
        //Para evitar o erro no construtor, apenas declare o super() dentro do construtor
        //para chamar o construtor da super classe
        super()
        //este atributo repository está recebendo o método AppDataSource.getRepository com generics padrão
        //o que significa, quando uma entitade chama-lo, será atribuido a entidade que o chamou
        this.repository =  AppDataSource.getRepository<T>(entity)
        this.onlyRootController = onlyRoot
    }

    //Este método irá verificar se o usuário é root ou não
    //Caso seja, retornará true, caso não, retornará false e não deixará executar a função
    private checkPermission(req: Request){
        return this.onlyRootController
    }

    //Este controlador está acionando o GET
    async all(req: Request, ignorePermission: boolean = false) {               
        if( this.checkPermission(req) ){
            return this.erroRoot
        }
    
        return this.repository.find({
            where: {
                deleted: false
            }
        })
    }
    

    //Este controlador está acionando o GET com o paramêtro id
    async one(req: Request, ignorePermission: boolean = false) {
        if( !ignorePermission ) {
            if( this.checkPermission(req) ){
                return this.erroRoot
            }
        }
        //O paramêtro vem como id, mas a busca no banco de dados a chave primaria está como uid
        const uid = req.params.id
        //para que a função findOne() funcione, será necessário incluir a claúsula where conforme abaixo        
        const user = await this.repository.findOne({
            where: {uid: uid}
        })
        //Caso não encontre o usuário do id informado, será exibido esta mensagem
        if (!user) {
            return "Informação não encontrada"
        }
        return user
    }

    //Este controlador está acionando o POST
    //Este é um método padrão para todos os controllers(pois seu model é any ou seja aceita qualquer classe que a chame)
    //E para ser usada, será necessário fazer uma sobrescrita do método
    //No controlador em questão e depois chamar este método que o super
    async save(model: any, req: Request, ignorePermission: boolean = false) {

        if( !ignorePermission ){
            if( this.checkPermission(req) ){
                return this.erroRoot
            }
        }
                
        if( model.uid ){
            delete model.deleted            
            delete model.createAt
            delete model.updateAt

            let _modelInDB = await this.repository.findOne({
                where: {uid: model.uid}
                //update tableName set a, b, c, d where uid = model.uid
            })
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
    
    //Este método irá apagar todos os dados da entidade em questão
    async apagaTudo(req: Request){
        if( this.checkPermission(req) ){
            return this.erroRoot
        }
        await this.repository.delete({
            where:{
                active: 1
            }
        })
        return "Todos os dados foram apagados com sucesso"
    }
    
    async remove(req: Request){
        if( this.checkPermission(req) ){
            return this.erroRoot
        }

        const uid = req.params.id
        //Primeiro recupera do banco de dados a informação
        var info = await this.repository.findOne({
            where: {uid: uid}
        })
        //Se ela existir então será apagada
        //Se não, então será exibida a informação ali de baixo
        if( info ){
            await this.repository.delete(uid)
            return "Dado apagado com sucesso"
        }else{
            return{
                status: 404,
                errors: "Informação não encontrada. Informe um código válido para apagar"
            }
        }
    }

    //Este controlador está acionando o DELETE com o paramêtro id
    //Este método irá apenas desabilitar o usuário do banco, como se estiver apagado
    async disable(req: Request) {
        if( this.checkPermission(req) ){
            return this.erroRoot
        }
        let uid = req.params.id
        let model = await this.repository.findOne({
            where: {
                uid: uid
            }
        })
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