import { BaseEntity } from "./BaseEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class ServiceProvider extends BaseEntity{
    
    @Column({type: "varchar", length: 200})
    name: string

    @Column({type: "varchar", length: 200, default: "xxx--xxx"})
    photo: string

    @Column({type: "varchar", length: 200})
    email: string

    @Column({type: "varchar", length: 100})
    password: string

    @Column({type: "varchar", length: 1000, nullable: true})
    description: string

    @Column({type: "varchar", length: 100, nullable: true})
    address: string

    @Column({type: "varchar", length: 1000, nullable: true})
    addressComplement: string

    @Column({type: "varchar", length: 2})
    state: string

    @Column({type: "varchar", length: 20})
    zipCode: string

    @Column({type: "varchar", length: 200, nullable: true})
    city: string

    @Column({type: "varchar", length: 1000})
    citiesCare: string

    @Column({type: "varchar", length: 1000})
    categoriesCare: string

    @Column({type: "varchar", length: 50})
    phone: string

}