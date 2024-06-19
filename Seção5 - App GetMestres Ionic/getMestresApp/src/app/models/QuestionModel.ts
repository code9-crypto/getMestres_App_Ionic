import { BaseModel } from "./BaseModel";
import { SubCategoryModel } from "./SubCategoryModel";
import { QuestionType } from "./enums/QuestionType";

export class QuestionModel extends BaseModel{
    question!: string
    type!: QuestionType
    options!: string
    subCategory: SubCategoryModel = new SubCategoryModel()

    super(){
        this.subCategory = new SubCategoryModel()
    }
}