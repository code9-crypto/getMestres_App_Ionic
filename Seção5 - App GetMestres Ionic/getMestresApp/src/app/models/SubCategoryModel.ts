import { BaseModel } from "./BaseModel";
import { CategoryModel } from "./CategoryModel";

export class SubCategoryModel extends BaseModel{
    name: string = ''
    cost: number = 0
    description: string = ''
    category: CategoryModel = new CategoryModel()

    constructor(){
        super()
        this.category = new CategoryModel()
    }
}