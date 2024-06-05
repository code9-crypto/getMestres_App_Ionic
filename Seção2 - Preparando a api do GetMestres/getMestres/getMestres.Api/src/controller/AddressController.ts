import { Response, Request } from 'express'

//esta constante recebe todos os dados deste json
const db = require('../shared/statesCities.json')

//Esta classe faz com que seja acessado os estados e cidades
export class AddressController{
    //Esta função retorna todas as siglas dos estados e respectivos nomes por extenso
    getAllStates = (req: Request, res: Response) => {
        const map = db.estados.map(({sigla, nome}) => {
            return { sigla, nome }
        })
        return res.status(200).send(map)
    }

    //Este função retorna todas as cidades baseado em um único estado
    getAllCities = (req: Request, res: Response) => {
        const { state } = req.params       
        const stateFound = db.estados.filter(x => x.sigla === state.toUpperCase())[0]
        if( stateFound ){
            return res.status(200).send(stateFound.cidades)
        }else{
            return res.status(404).send(`Estado ${state} não encontrado`)
        }
    }
}