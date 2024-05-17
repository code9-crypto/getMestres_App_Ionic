import { BaseModel } from "./BaseModel"

export class CategoryModel extends BaseModel{
    name: string = '';
    description: string = '';
    question: string = ''
    options: string = ''
    email: string = ''
    state: string = ''
    citiesCare: string = ''
    phone: string = ''
}