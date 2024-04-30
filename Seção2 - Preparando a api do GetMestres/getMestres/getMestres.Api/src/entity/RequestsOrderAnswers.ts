import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { RequestsOrder } from "./RequestsOrder";
import { Question } from "./Question";

@Entity()
export class RequestsOrderAnswers extends BaseEntity{
    @Column({type: "text", nullable: false})
    answer: string

    @ManyToOne(() => RequestsOrder, { eager: true })
    requestOrder: RequestsOrder

    @ManyToOne(() => Question, { eager: true })
    question: RequestsOrder

}