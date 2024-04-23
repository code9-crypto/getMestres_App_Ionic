import { UserController } from "./controller/UserController"
import { CategoryController } from "./controller/CategoryController"
import { SubCategoryController } from "./controller/SubCategoryController"
import { QuestionController } from "./controller/QuestionController"
import { Question } from "./entity/Question"

export const Routes = [
    //Rotas para usuário
    {method: "get", route: "/users", controller: UserController, action: "all"},
    {method: "get", route: "/users/:id", controller: UserController, action: "one"},
    {method: "delete", route: "/users/:id", controller: UserController, action: "remove"},
    {method: "delete", route: "/users/todos/apagar", controller: UserController, action: "apagaTudo"},
    {method: "delete", route: "/users/disable/:id", controller: UserController, action: "disable"},
    {method: "post", route: "/users/create", controller: UserController, action: "createUser"},
    {method: "post", route: "/users/auth", controller: UserController, action: "auth"},

    //Rotas para categorias
    {method: "get", route: "/category", controller: CategoryController, action: "all"},
    {method: "get", route: "/category/:id", controller: CategoryController, action: "one"},
    {method: "post", route: "/category", controller: CategoryController, action: "save"},
    {method: "delete", route: "/category/:id", controller: CategoryController, action: "remove"},
    {method: "delete", route: "/category/disable/:id", controller: CategoryController, action: "disable"},

    //Rotas para SubCategorias
    {method: "get", route: "/subCategory", controller: SubCategoryController, action: "all"},
    {method: "get", route: "/subCategory/:id", controller: SubCategoryController, action: "one"},
    {method: "post", route: "/subCategory", controller: SubCategoryController, action: "save"},
    {method: "delete", route: "/subCategory/:id", controller: SubCategoryController, action: "remove"},
    {method: "delete", route: "/subCategory/disable/:id", controller: SubCategoryController, action: "disable"},

    //Rotas para Questions
    {method: "get", route: "/question", controller: QuestionController, action: "all"},
    {method: "get", route: "/question/:id", controller: QuestionController, action: "one"},
    {method: "post", route: "/question", controller: QuestionController, action: "save"},
    {method: "delete", route: "/question/:id", controller: QuestionController, action: "remove"},
    {method: "delete", route: "/question/disable/:id", controller: QuestionController, action: "disable"}
]