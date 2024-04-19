//route -> controller -> repository
//route -> middleware -> controller -> repository
import {Response, Request, NextFunction} from "express"
import { verify } from "jsonwebtoken"
import config from "../configuration/config"

//Esta classe foi criada para bloquear o acesso de usuários que não autorização
//Com ela todas as rotas são bloqueadas, a não ser que tenha acesso válido
export default async(req: Request, res: Response, next: NextFunction) => {
    //NextFunction é o paramêtro que permite continuar para o próximo
    let token = req.body.token || req.query.token || req.headers['x-token-access']
    //Se na requisição vier um token, então entrará  no if
    if( token ){
        try{
            //Aqui está fazendo a verificação no token, se foi feito com a chave correta
            //Caso não, cairá no catch()
            let _userAuth = verify(token, config.secretKey)
            req.userAuth = _userAuth
            next()
        }catch(err){
            res.status(401).send({message: "Token informado inválido"})
        }
    }else{
        res.status(401).send({message: "Para acessar esse recurso você precisa estar autenticado"})
        return
    }
}