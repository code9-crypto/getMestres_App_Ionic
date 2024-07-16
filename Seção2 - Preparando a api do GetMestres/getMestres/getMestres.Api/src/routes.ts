import { UserController } from "./controller/UserController"
import { CategoryController } from "./controller/CategoryController"
import { SubCategoryController } from "./controller/SubCategoryController"
import { QuestionController } from "./controller/QuestionController"
import { CustomerController } from "./controller/CustomerController"
import { ServiceProviderController } from "./controller/ServiceProviderController"
import { RequestsOrderController } from "./controller/RequestsOrderController"
import { RequestsOrderAnswersController } from "./controller/RequestsOrderAnswersController"
import { StorageController } from "./controller/StorageController"
import { AddressController } from "./controller/AddressController"

export const Routes = [
    //Rotas para usuário
    {method: "get", route: "/users", controller: UserController, action: "all"},
    {method: "get", route: "/users/:id", controller: UserController, action: "one"},
    {method: "delete", route: "/users/:id", controller: UserController, action: "remove"},
    {method: "delete", route: "/users/todos/apagar", controller: UserController, action: "apagaTudo"},
    {method: "delete", route: "/users/disable/:id", controller: UserController, action: "disable"},
    {method: "post", route: "/users/create", controller: UserController, action: "createUser"},
    {method: "post", route: "/users/auth", controller: UserController, action: "auth"},
    {method: "post", route: "/users", controller: UserController, action: "save"},

    //Rotas para categorias
    {method: "get", route: "/category", controller: CategoryController, action: "all"},
    {method: "get", route: "/category/:id/subcategories", controller: CategoryController, action: "getAllSubCategories"},
    {method: "get", route: "/category/:id", controller: CategoryController, action: "one"},
    {method: "post", route: "/category", controller: CategoryController, action: "save"},
    {method: "delete", route: "/category/:id", controller: CategoryController, action: "remove"},
    {method: "delete", route: "/category/disable/:id", controller: CategoryController, action: "disable"},

    //Rotas para SubCategorias
    {method: "get", route: "/subCategory", controller: SubCategoryController, action: "all"},
    {method: "get", route: "/subCategory/:id", controller: SubCategoryController, action: "one"},
    {method: "get", route: "/subCategory/:id/questions", controller: SubCategoryController, action: "getAllQuestions"},
    {method: "post", route: "/subCategory", controller: SubCategoryController, action: "save"},
    {method: "delete", route: "/subCategory/:id", controller: SubCategoryController, action: "remove"},
    {method: "delete", route: "/subCategory/disable/:id", controller: SubCategoryController, action: "disable"},

    //Rotas para Questions
    {method: "get", route: "/question", controller: QuestionController, action: "all"},
    {method: "get", route: "/question/:id", controller: QuestionController, action: "one"},
    {method: "post", route: "/question", controller: QuestionController, action: "save"},
    {method: "delete", route: "/question/:id", controller: QuestionController, action: "remove"},
    {method: "delete", route: "/question/disable/:id", controller: QuestionController, action: "disable"},

    //Rotas para Customer
    {method: "get", route: "/customer", controller: CustomerController, action: "all"},
    {method: "get", route: "/customer/:id", controller: CustomerController, action: "one"},
    {method: "get", route: "/customer/my/orders", controller: CustomerController, action: "getMyAllOrders"},
    {method: "post", route: "/customer", controller: CustomerController, action: "save"},
    {method: "post", route: "/customer/create", controller: CustomerController, action: "createCustomer"},
    {method: "post", route: "/customer/changePassword", controller: CustomerController, action: "changePassword"},
    {method: "delete", route: "/customer/:id", controller: CustomerController, action: "remove"},
    {method: "delete", route: "/customer/disable/:id", controller: CustomerController, action: "disable"},
    {method: "post", route: "/customer/auth", controller: CustomerController, action: "auth"},    

    //Rotas para ServiceProvider
    {method: "get", route: "/serviceProvider", controller: ServiceProviderController, action: "all"},
    {method: "get", route: "/serviceProvider/:id", controller: ServiceProviderController, action: "one"},
    {method: "get", route: "/serviceProvider/orders/availables", controller: ServiceProviderController, action: "getAllOrdersAvailables"},
    {method: "post", route: "/serviceProvider", controller: ServiceProviderController, action: "save"},
    {method: "post", route: "/serviceProvider/create", controller: ServiceProviderController, action: "createServiceProvider"},
    {method: "delete", route: "/serviceProvider/:id", controller: ServiceProviderController, action: "remove"},
    {method: "delete", route: "/serviceProvider/disable/:id", controller: ServiceProviderController, action: "disable"},
    {method: "post", route: "/serviceProvider/auth", controller: ServiceProviderController, action: "auth"},
    {method: "post", route: "/serviceProvider/changePassword", controller: ServiceProviderController, action: "changePassword"},

    //Rotas para Requests
    {method: "get", route: "/requests", controller: RequestsOrderController, action: "all"},
    {method: "get", route: "/requests/:id", controller: RequestsOrderController, action: "one"},
    {method: "post", route: "/requests", controller: RequestsOrderController, action: "save"},    
    {method: "delete", route: "/requests/:id", controller: RequestsOrderController, action: "remove"},
    {method: "delete", route: "/requests/disable/:id", controller: RequestsOrderController, action: "disable"},

    //Rotas para RequestsAnswers
    {method: "get", route: "/requestsAnswer/:orderUid/all", controller: RequestsOrderAnswersController, action: "all"},    
    {method: "post", route: "/requestsAnswer", controller: RequestsOrderAnswersController, action: "save"},    
    {method: "delete", route: "/requestsAnswer/:id", controller: RequestsOrderAnswersController, action: "remove"},
    {method: "delete", route: "/requestsAnswer/disable/:id", controller: RequestsOrderAnswersController, action: "disable"},

    //Rota para o Storage
    {method: "get", route: "/storage/:filename", controller: StorageController, action: "getFile"},

    {method: "get", route: "/address", controller: AddressController, action: "getAllStates"},
    {method: "get", route: "/address/:state", controller: AddressController, action: "getAllCities"},
]
