import { BaseController } from "./BaseController";
import { Category } from "../entity/Category"
import { Request } from "express"
import { SubCategory } from "../entity/SubCategory";
import { AppDataSource } from "../data-source";

export class CategoryController extends BaseController<Category>{

    //O AppDataSource é o padrão do typoORM que há métodos para fazer acesso ao banco de dados
    //como o exemplo abaixo, getRepository()
    private subCategoryRepository = AppDataSource.getRepository(SubCategory)
    private categoryRepository = AppDataSource.getRepository(Category)

    constructor(){
        super(Category, true)
    }

    //Sobrescrita do método save
    async save(req: Request){
        let categoria = <Category>req.body
        super.isRequired(categoria.name, "Informe o nome da categoria")
        super.isRequired(categoria.description, "Informe a descrição da categoria")
        return super.save(categoria, req)
    }

    //Sobrescrita do método all
    async all(req: Request){
        return this.categoryRepository.find({
            where: {
                deleted: false
            }
        })
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
                deleted: false,
                active: true
            }
        })
    }
}