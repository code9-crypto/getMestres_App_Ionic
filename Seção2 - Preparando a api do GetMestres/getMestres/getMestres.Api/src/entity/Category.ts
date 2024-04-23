import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity()//Caso não seje inserido um parâmetro para o nome da entidade
//Então o ORM criará a entidade baseada no nome da classe
export class Category extends BaseEntity {
    @Column({type: "varchar", length: 500})
    name: string

    @Column({type: "varchar", length: 1000, nullable: true})
    description: string
}