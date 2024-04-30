import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";
import { Request } from "express"

export class SubCategoryController extends BaseController<SubCategory>{
    constructor(){
        super(SubCategory)
    }

    async save(req: Request){
        let subCategoria = <SubCategory>req.body

        super.isRequired(subCategoria.name, "Informe o nome da categoria")
        super.isRequired(subCategoria.category, "A categoria é obrigatória")
        super.isRequired(subCategoria.cost, "O Custo é obrigatório")
        super.isTrue(isNaN(subCategoria.cost), "O custo deve ser um número")
        super.isTrue(subCategoria.cost < 0, "O custo deve ser maior do que 0")

        return super.save(subCategoria, req)
    }
}