import { BaseModel } from "./BaseModel";

export class CustomerModel extends BaseModel{
    name!: string
    email!: string
    photo!: string
    phone!: string
    password!: string
    confirmPassword!: string
}