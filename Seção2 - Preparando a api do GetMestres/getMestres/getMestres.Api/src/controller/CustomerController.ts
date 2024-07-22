import config from "../configuration/config";
import { Customer } from "../entity/Customer";
import { FileHelper } from "../helpers/fileHelper";
import { BaseController } from "./BaseController";
import { Request } from "express"
import * as md5  from "md5"
import { sign } from "jsonwebtoken"
import { AppDataSource } from "../data-source";
import { RequestsOrder } from "../entity/RequestsOrder";
import { In } from "typeorm";

export class CustomerController extends BaseController<Customer>{

    private requestOrder = AppDataSource.getRepository(RequestsOrder)

    constructor(){
        super(Customer, true)
    }

    //Método para listar todas as Orders(pedidos/solicitações)
    async getMyAllOrders(req: Request){
        const { status } = req.query
        const where = {
            customer: {
                uid: req.userAuth.uid
            },
            deleted: false,
            statusOrder: In(!status ? [1,2] : [status])
        }

        return this.requestOrder.find({
            where
        })
    }

    //Método que faz a validação do usuário
    async auth(req: Request){
        //Pega os valores recebidos no corpo da requisição
        //Este destructing está sendo feito por meio de um objeto, por isso o uso das {}(chaves)
        //Case tenha sido feito por meior de array, seria usado [](colchetes)
        let { email, password } = req.body
        //faz um validação se foi informado email ou senha
        if( !email || !password ){
            return {
                status: 400,
                message: "Informe o email e a senha para efetuar o login"
            }
        }
        //Caso tenha informado login e senha
        //será feito uma busca no banco de dados com as informões de email e senha
        let user = await this.repositoryMethod.findOne({
            where: {
                email:email, 
                password:md5(password)
            }
        })
        //Se for encontrado um usuário válido
        if( user ){
            //Então será montado um objeto com esses dados
            let payload = {
                uid: user.uid,
                name: user.name,
                photo: user.photo,
                email: user.email
            }
            //Depois será retornado para este com os valores abaixo
            //Inclusive o token
            return{
                status: 200,
                message: {
                    user: payload,
                    token: sign({
                        ...payload,
                        tm: new Date().getTime()
                    }, config.secretKey)
                }
            }
        }else{
            return {
                status: 404,
                message: "E-mail ou senha inválidos"
            }
        }
    }

    async one(req: Request){
        const customer = await super.one(req)
        delete customer['password']
        return customer
    }

    async changePassword(req: Request){
        const userId = req.userAuth.uid
        const { currentPassword, newPassword, confirmNewPassword } = req.body

        this.isRequired(currentPassword, 'A senha atual é obrigatória')
        this.isRequired(newPassword, 'A nova senha é obrigatória')
        this.isRequired(confirmNewPassword, 'A confirmação da nova senha é obrigatória')
        this.isTrue(newPassword != confirmNewPassword, 'A senha e a confirmação de senha não são iguais')        
        
        if( !this.valid() ){
            return {
                status: 400,
                errors: this.allNotifications
            }
        }

        const customer = await this.repositoryMethod.findOne({
            where:{
                uid: userId
            }
        })
        if( customer ){
            if( customer.password != md5(currentPassword) ){
                return { 
                    status: 400,
                    message: 'A senha atual é inválida'
                }
            }
            customer.password = md5(newPassword)
            this.repositoryMethod.save(customer)
        }else{
            return { status: 404, message: 'Usuário não encontrado' }
        }
    }

    async save(request: Request){
        const customer = <Customer>request.body
        const { confirmPassword } = request.body
        //O super está sendo chamado, pois é para que a validação seja feita na superclasse, não na classe local
        super.isRequired(customer.name, "O nome é obrigatório")
        //super.isRequired(customer.photo, "A foto é obrigatória")
        super.isRequired(customer.email, "O email é obrigatório")
        super.isRequired(customer.phone, "Telefone é obrigatório")

        if( !customer.uid ){
            super.isRequired(customer.password, "A senha é obrigatória")
            super.isRequired(request.body.confirmPassword, "A confirmação da senha é obrigatória")
            super.isTrue((customer.password != confirmPassword), "A senha e a confirmação de senha estão diferentes")    
        }else{
            delete customer.password
        }


        if( customer.photo ){
            let pictureCreatedResult = await FileHelper.writePicture( customer.photo )
            if( pictureCreatedResult ){
                customer.photo = pictureCreatedResult
            }
        }

        return super.save(customer, request, this.isMe(request))
    }

    //Método para fazer a validação de criar o novo cliente
    async createCustomer(req: Request){
        let customer = <Customer>req.body
        let { confirmPassword } = req.body
        super.isRequired(customer.name, "O nome é obrigatório")
        super.isRequired(customer.photo, "A foto é obrigatória")
        super.isRequired(customer.email, "O email é obrigatório")
        super.isRequired(customer.phone, "Telefone é obrigatório")
        super.isRequired(customer.password, "A senha é obrigatória")
        super.isRequired(req.body.confirmPassword, "A confirmação da senha é obrigatória")
        super.isTrue((customer.password != confirmPassword), "A senha e a confirmação de senha estão diferentes")

        if( customer.photo ){
            let pictureCreatedResult = await FileHelper.writePicture( customer.photo )
            if( pictureCreatedResult ){
                customer.photo = pictureCreatedResult
            }
        }

        if( customer.password ){
            customer.password = md5(customer.password)
        }

        return super.save(customer , req, true)
    }

    isMe(req: Request): boolean{
        try{
            const uid = req.params.id as string
            const userId = req.userAuth.uid
            return (uid == userId)
        }catch(error){
            return false
        }
    }
}