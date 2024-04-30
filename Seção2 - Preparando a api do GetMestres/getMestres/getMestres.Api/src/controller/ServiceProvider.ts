import { ServiceProvider } from "../entity/ServiceProvider";
import { BaseController } from "./BaseController";
import { Request } from "express"
import * as md5 from "md5"

export class ServiceProviderController extends BaseController<ServiceProvider>{
    constructor(){
        super(ServiceProvider)
    }

    private validationDefault(serviceProvider: ServiceProvider): void{
        super.isRequired(serviceProvider.name, "O nome é obrigatório")
        super.isRequired(serviceProvider.photo, "A foto é obrigatório")
        super.isRequired(serviceProvider.email, "O Email é obrigatório")
        super.isRequired(serviceProvider.phone, "Telefone é obrigatório")
        super.isRequired(serviceProvider.categoriesCare, "Informe as categorias atendidas")
        super.isRequired(serviceProvider.citiesCare, "Informe as cidades atendidas")
        super.isRequired(serviceProvider.zipCode, "Informe o CEP")
        super.isRequired(serviceProvider.state, "Informe o estado")
    }

    async save(request: Request){
        let serviceProvider = <ServiceProvider>request.body

        //O super está sendo chamado, pois é para que a validação seja feita na superclasse, não na classe local
        this.validationDefault(serviceProvider)

        return super.save(serviceProvider, request)
    }

    async createServiceProvider(req: Request){
        let serviceProvider = <ServiceProvider>req.body
        let { confirmPassword } = req.body

        this.validationDefault(serviceProvider)
        super.isRequired(serviceProvider.password, "A senha é obrigatória")
        super.isRequired(confirmPassword, "A confirmação da senha é obrigatória")
        super.isTrue((serviceProvider.password != confirmPassword), "A senha e a confirmação de senha estão diferentes")

        if( serviceProvider.password ){
            serviceProvider.password = md5(serviceProvider.password)
        }

        return super.save(serviceProvider , req, true)
    }
}