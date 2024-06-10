import { Entity, Column } from "typeorm"
import { BaseEntity } from "./BaseEntity"

//@Entity é a notação para criar a tabela no banco
@Entity(/*{name : "User"}*/)
export class User extends BaseEntity{
    //declarando e configurando campo que será criado no banco de dados
    //pelo ORM
    @Column({type: "varchar", length: 100})
    name: string

    //@Column é notação para criar a tabela no banco
    @Column({type: "varchar", length: 200, default: "xxx--xxx"})
    photo: string

    @Column({type: "varchar", length: 200})
    email: string

    @Column({default: false})
    isRoot: boolean

    @Column({type: "varchar", length: 100})
    password: string
    //OBS.: caso queira que um campo seja nulo
    //apenas adicione nos paramêtros, nullable: true
}
