import { BaseController } from "./BaseController";
import { Category } from "../entity/Category"
import { Request } from "express"
import { SubCategory } from "../entity/SubCategory";
import { AppDataSource } from "../data-source";

export class CategoryController extends BaseController<Category>{

    //O AppDataSource é o padrão do typoORM que há métodos para fazer acesso ao banco de dados
    //como o exemplo abaixo, getRepository()
    private subCategoryRepository = AppDataSource.getRepository(SubCategory)

    constructor(){
        super(Category, true)
    }

    async save(req: Request){
        let categoria = <Category>req.body
        super.isRequired(categoria.name, "Informe o nome da categoria")
        super.isRequired(categoria.description, "Informe a descrição da categoria")
        return super.save(categoria, req)
    }

    getAllSubCategories(req: Request){
        const { id: categoryId } = req.params
        return this.subCategoryRepository.find({
            where:{
                category: categoryId,
                deleted: false
            }
        })
    }
}