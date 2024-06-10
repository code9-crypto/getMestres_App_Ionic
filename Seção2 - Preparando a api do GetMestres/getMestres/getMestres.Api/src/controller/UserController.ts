import { User } from "../entity/User"
import { BaseController } from "./BaseController"
import { Request } from "express"
import * as md5 from "md5"
import { sign } from "jsonwebtoken"
import config from "../configuration/config"

export class UserController extends BaseController<User> {

    constructor(){
        //O segundo paramêtro será necessário caso a classe seja usada apenas pelo ROOT
        super(User)
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

    async createUser(request: Request){
        let {name, photo, email, password, confirmPassword, isRoot} = request.body
        super.isRequired(name, "Informe o nome")
        //super.isRequired(photo, "Informe a foto")
        super.isRequired(email, "Informe o email")
        super.isRequired(password, "Informe a senha")
        super.isRequired(confirmPassword, "Informe a confirmação da senha")
        
        
        let _user = new User()
        _user.name = name
        _user.photo = photo
        _user.email = email

        if( password != confirmPassword){
            return {
                status:400,
                errors: "A senha e a confirmação são diferentes"
            }
        }

        if( password ){
            _user.password = md5(password)
        }
        _user.isRoot = isRoot

        return super.save(_user, request, true)
    }

    //Este método save seria para criar o usuário diretamente sem verificação
    //Mas o método acima fará isso, porém este método ficará aqui para estudos posteriores
    async save(request: Request){
        let _user = <User>request.body
        //O super está sendo chamado, pois é para que a validação seja feita na superclasse, não na classe local
        super.isRequired(_user.name, "O nome do usuário é obrigatório")
        //super.isRequired(_user.photo, "A foto do usuário é obrigatória")
        super.isRequired(_user.email, "O email do usuário é obrigatório")
        super.isRequired(_user.password, "A senha do usuário é obrigatória")
        return super.save(_user, request)
    }

    /*
    ESTA CODIFICAÇÃO VEIO POR PADRÃO QUANDO O PROJETO FOI CRIADO


    private userRepository = AppDataSource.getRepository(User)

    //Este controlador está acionando o GET
    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    //Este controlador está acionando o GET com o paramêtro id
    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.uid


        const user = await this.userRepository.findOne({
            where: id 
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    //Este controlador está acionando o POST
    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })
        
        return this.userRepository.save(user)
    }

    //Este controlador está acionando o DELETE com o paramêtro id
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.uid

        let userToRemove = await this.userRepository.findOneBy( id )

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }*/

}