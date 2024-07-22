import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import  config  from "./configuration/config"
import auth from "./middleware/auth"
import * as cors from "cors"

// create express app
const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

//Middleware que faz autenticação para acesso as rotas
app.use(auth)

// register express routes from defined application routes
//Esta codificação está sendo usada para qualquer rota que estiver dentro do arquivo routes.ts
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            //result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            //Com esta codificação, a API irá retornar o status conforme definido no controller
            result.then(d => {
                if( d && d.status ){
                    res.status(d.status).send(d.message || d.errors)
                }else if (d && d.file){
                    res.sendFile(d.file)
                }else{
                    res.json(d)
                }
            })
        } else if (result !== null && result !== undefined) {
            res.send(result)

        }
    })
})

app.listen(config.port, "0.0.0.0", async () => {
    console.log(`Api initialize in port ${config.port}`);
    try{
        //inicia a API já fazendo conexão com banco de dados
        await AppDataSource.initialize(); //await AppDataSource.initialize() or createConnection
        console.log("Database connected");
    }catch(err){
        console.log("Database not connected", err);
    }
})