//route -> controller -> repository
//route -> middleware -> controller -> repository
//OBS.: as imports de Request, Response e NextFunction, são variáveis de ambiente
import {Response, Request, NextFunction} from "express"
import { verify } from "jsonwebtoken"
import config from "../configuration/config"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Repository } from "typeorm"

//Esta classe foi criada para bloquear o acesso de usuários que não autorização
//Com ela todas as rotas são bloqueadas, a não ser que tenha acesso válido
export default async(req: Request, res: Response, next: NextFunction) => {
    //NextFunction é o paramêtro que permite continuar para o próximo
    let token = req.body.token || req.query.token || req.headers['x-token-access']

    //Nesta codificação, está verificando se dentro do array está contido uma rota pública
    //caso tenha, não será barrado por este middleware
    //OBS.: para fazer um casting é desta forma abaixo
    let publicRoutes = <Array<String>>config.publicRoutes
    let isPublicRoute: boolean = false
    //Chamando o getRepository do AppDataSource e passando a entitade em questão para ter acesso
    //Tipando o userRepository mais ainda para a entidade em questão
    let userRepository: Repository<User> = AppDataSource.getRepository(User)
    //Aqui está fazendo varrendo o array procurando se há uma rota pública
    publicRoutes.forEach(url => {
        let isPublic = req.url.includes(url) || req.url.indexOf('storage') > -1
        if( isPublic ){
            isPublicRoute = true
        }
    });
    //Caso tenha uma rota pública, então continua o acesso
    if( isPublicRoute ){
        next()
    //Caso não, será barrado
    }else{
        //Se na requisição vier um token, então entrará  no if
        if( token ){
            try{
                //Aqui está fazendo a verificação no token, se foi feito com a chave correta
                //Caso não, cairá no catch()
                const _userAuth = verify(token, config.secretKey)
                req.userAuth = _userAuth
                //Fazendo a verificação se o usuário é root
                const userDB = await userRepository.findOne({
                    where:{
                        uid: req.userAuth.uid
                    }
                })
                req.IsRoot = userDB.isRoot || false                
                next()
            }catch(err){
                console.log(err)                
                res.status(401).send({message: "Token informado inválido"})                
            }
        }else{
            res.status(401).send({message: "Para acessar esse recurso você precisa estar autenticado"})
            return
        }
    }
}