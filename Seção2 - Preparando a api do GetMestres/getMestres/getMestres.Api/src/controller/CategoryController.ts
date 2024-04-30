import { BaseController } from "./BaseController";
import { Category } from "../entity/Category"
import { Request } from "express"

export class CategoryController extends BaseController<Category>{
    constructor(){
        super(Category, true)
    }

    async save(req: Request){
        let categoria = <Category>req.body
        super.isRequired(categoria.name, "Informe o nome da categoria")
        super.isRequired(categoria.description, "Informe a descrição da categoria")
        return super.save(categoria, req)
    }
}