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

    //Este método pega todos os subcategories referente àqueles categories informados
    //Por isso, que a claúsula where está sendo feita daquele jeito
    getAllSubCategories(req: Request){
        //Aqui estou transformando o id(que vem por paramêtro) e converto para categoryId
        const { id: categoryId } = req.params        
        return this.subCategoryRepository.find({
            where:{
                category: {
                    uid: categoryId
                },
                deleted: false
            }
        })
    }
}