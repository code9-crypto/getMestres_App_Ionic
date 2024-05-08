import { IInterfaces } from "./IInterfaces";

export interface ICategories extends IInterfaces{
    name: string,
    description: string,
    question: string,
    options: string,
    email: string,
    state: string,
    citiesCare: string,
    phone: string
}