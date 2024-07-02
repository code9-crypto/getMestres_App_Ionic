import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { RequetsStatus } from "./enum/RequestsStatus"
import { Customer } from "./Customer";
import { ServiceProvider } from "./ServiceProvider";
import { SubCategory } from "./SubCategory";

@Entity()
export class RequestsOrder extends BaseEntity{
    @Column({type: "varchar", length: 100})
    longlat: string

    @Column({type: "varchar", length: 200})
    title: string

    @Column({type: "text"})
    description: string

    @Column()
    statusOrder: RequetsStatus

    @ManyToOne(() => Customer, { eager: true })
    customer: Customer

    @ManyToOne(() => SubCategory, { eager: true })
    subCategory: SubCategory

    @ManyToOne(() => ServiceProvider, { eager: true, nullable: true})
    serviceProvider: ServiceProvider
    userAuth: any;

}