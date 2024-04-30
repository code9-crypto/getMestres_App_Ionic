import { Customer } from "../entity/Customer";
import { BaseController } from "./BaseController";
import { Request } from "express"
import * as md5  from "md5"

export class CustomerController extends BaseController<Customer>{
    constructor(){
        super(Customer, true)
    }

    async save(request: Request){
        let customer = <Customer>request.body
        //O super está sendo chamado, pois é para que a validação seja feita na superclasse, não na classe local
        super.isRequired(customer.name, "O nome é obrigatório")
        super.isRequired(customer.photo, "A foto é obrigatória")
        super.isRequired(customer.email, "O email é obrigatório")
        super.isRequired(customer.phone, "Telefone é obrigatório")        

        delete customer.password

        return super.save(customer , request)
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

        if( customer.password ){
            customer.password = md5(customer.password)
        }

        return super.save(customer , req, true)
    }
}