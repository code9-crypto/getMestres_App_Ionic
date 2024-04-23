import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

@Entity()
export class SubCategory extends BaseEntity{
    
    @Column({type: "varchar", length: 100})
    name: string

    @Column()
    cost: number

    @Column({type: "varchar", length: 1000, nullable: true})
    description: string

    //Fazendo referência de MUITOS para UM
    //leitura: (MUITAS subcategorias para UMA categoria)
    //Usa-se a classe em questão como paramêtro
    @ManyToOne(() => Category, {eager: true}) //AutoPopulate
    category: Category
    

}