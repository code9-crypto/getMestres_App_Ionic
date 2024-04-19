import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

//O termo abstract foi usado nesta classe, pois ela não pode ser instanciada
//Ela será usada apenas para ser herdada por outra classe
export abstract class BaseEntity{
    //Este notação é usada pelo TypeORM
    //@PrimaryGeneratedColumn irá criar o campo que será chave primária, auto_incremented 
    @PrimaryGeneratedColumn("uuid")
    uid: string

    @Column({default: true})
    active: boolean

    @Column({default: false})
    deleted: boolean

    @CreateDateColumn({type: "timestamp"})
    createAt: Date

    @UpdateDateColumn({type: "timestamp"})
    updateAt: Date
}