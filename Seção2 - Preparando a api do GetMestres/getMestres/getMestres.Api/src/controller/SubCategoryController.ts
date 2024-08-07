import { AppDataSource } from "../data-source";
import { Question } from "../entity/Question";
import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";
import { Request } from "express"

export class SubCategoryController extends BaseController<SubCategory>{

    private questionRespository = AppDataSource.getRepository(Question)

    constructor(){
        super(SubCategory, true)
    }

    //Sobrescrita de método
    async save(req: Request){
        let subCategoria = <SubCategory>req.body

        super.isRequired(subCategoria.name, "Informe o nome da categoria")
        super.isRequired(subCategoria.category, "A categoria é obrigatória")
        super.isRequired(subCategoria.cost, "O Custo é obrigatório")
        super.isTrue(isNaN(subCategoria.cost), "O custo deve ser um número")
        super.isTrue(subCategoria.cost < 0, "O custo deve ser maior do que 0")

        return super.save(subCategoria, req)
    }

    async getAllQuestions(req: Request){
        const { id } = req.params
        return this.questionRespository.find({
            where:{
               subCategory:{
                uid: id
               },
               deleted: false,
               active: true     
            }
        })
    }

    //Sobrescrita de método
    // async all(req: Request){
    //     return this.repositoryMethod.find({
    //         where: {
    //             deleted: false
    //         }
    //     })
    // }

}