import { ServiceProvider } from "../entity/ServiceProvider";
import { FileHelper } from "../helpers/fileHelper";
import { BaseController } from "./BaseController";
import { Request } from "express"
import * as md5 from "md5"
import { sign } from "jsonwebtoken"
import config from "../configuration/config"
import { AppDataSource } from "../data-source";
import { RequestsOrder } from "../entity/RequestsOrder";
import { In } from "typeorm";
import { SubCategory } from "../entity/SubCategory";
import { RequetsStatus } from "../entity/enum/RequestsStatus";

export class ServiceProviderController extends BaseController<ServiceProvider>{

    private requestOrder = AppDataSource.getRepository(RequestsOrder)
    private subCategory = AppDataSource.getRepository(SubCategory)

    constructor(){
        super(ServiceProvider, true)
    }

    //Método para listar todas as Orders(pedidos/solicitações)
    async getAllOrdersAvailables(req: Request){
        const { status } = req.query

        const where = {
            customer: {
                uid: req.userAuth.uid
            },
            deleted: false,
            statusOrder: In(!status ? [1] : [status])
        }
        
        const myData = await this.repositoryMethod.findOne({
            where: {
                uid: req.userAuth.uid
            }
        })

        const categories = myData.categoriesCare.split(',').map( c => c.trim())

        const subCategories = await this.subCategory.find({
            where:{
                name: In(categories)
            }
        })
        
        if( Array.isArray(subCategories) ){
            where['subCategory'] = In(subCategories.map( s => s.uid ))
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

    private validationDefault(serviceProvider: ServiceProvider): void{
        super.isRequired(serviceProvider.name, "O nome é obrigatório")
        //super.isRequired(serviceProvider.photo, "A foto é obrigatório")
        super.isRequired(serviceProvider.email, "O Email é obrigatório")
        super.isRequired(serviceProvider.phone, "Telefone é obrigatório")
        super.isRequired(serviceProvider.categoriesCare, "Informe as categorias atendidas")
        super.isRequired(serviceProvider.citiesCare, "Informe as cidades atendidas")
        super.isRequired(serviceProvider.zipCode, "Informe o CEP")
        super.isRequired(serviceProvider.state, "Informe o estado")
    }

    //Sobrescrita de método
    async save(request: Request){
        let serviceProvider = <ServiceProvider>request.body
        
        //Verificando se existe o usuário no banco
        const modelInDB = await this.repositoryMethod.findOne({
            where: {
                uid: serviceProvider.uid
            }
        })

        //Caso exista, cairá aqui
        //E a pesquisa que foi feita acima, será substituída pela nova
        if( modelInDB ){
            delete serviceProvider['password']
            return this.repositoryMethod.save(serviceProvider)
        }else{
            return {
                status: 404,
                errors: 'Usuário não encontrado'
            }
        }
        
        
    }

    async createServiceProvider(req: Request){
        let serviceProvider = <ServiceProvider>req.body
        let { confirmPassword } = req.body

        this.validationDefault(serviceProvider)
        super.isRequired(serviceProvider.password, "A senha é obrigatória")
        super.isRequired(confirmPassword, "A confirmação da senha é obrigatória")
        super.isTrue((serviceProvider.password != confirmPassword), "A senha e a confirmação de senha estão diferentes")

        if( serviceProvider.photo ){
            let pictureCreatedResult = await FileHelper.writePicture( serviceProvider.photo )
            if( pictureCreatedResult ){
                serviceProvider.photo = pictureCreatedResult
            }
        }

        if( serviceProvider.password ){
            serviceProvider.password = md5(serviceProvider.password)
        }

        return super.save(serviceProvider , req, true)
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

    async getMyOrders(req: Request){
        const { status } = req.query
        return this.requestOrder.find({
            where: {
                deleted: false,
                serviceProvider: req.userAuth.id,
                statusOrder: status ? status : RequetsStatus.accepted
            }
        })
    }

    //Sobrescrita de método
    async one(req: Request){
        const provId = req.params.id
        const servProv = await this.repositoryMethod.findOne({
            where:{
                uid: provId
            }
        })
        delete servProv['password']
        return servProv
    }

    //Sobrescrita do método
    // async all(req: Request){
    //     return this.repositoryMethod.find({
    //         where: {
    //             deleted: false
    //         }
    //     })
    // }
}