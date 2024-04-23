import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Category } from "./entity/Category"
import { SubCategory } from "./entity/SubCategory"
import { Question } from "./entity/Question"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "getmestres",    
    synchronize: true,
    logging: false,
    entities: [User, Category, SubCategory, Question],
    migrations: [],
    subscribers: [],
})
