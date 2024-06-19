import { BaseModel } from "./BaseModel";

export class UserModel extends BaseModel{
    name!: string
    email!: string
    photo!: string
    phone!: string
    password!: string
    confirmPassword!: string
}