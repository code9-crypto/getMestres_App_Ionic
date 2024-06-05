import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { SubcategoriesComponent } from './pages/subcategories/subcategories.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ServiceprovidersComponent } from './pages/serviceproviders/serviceproviders.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './shared/admin.guard';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { QuestionComponent } from './pages/question/question.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent},
    { path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard]},
    { path: 'category/:id', component: CategoryComponent, canActivate: [AdminGuard] },
    { path: 'subCategories', component: SubcategoriesComponent, canActivate: [AdminGuard] },
    { path: 'subCategory/:id', component: SubcategoryComponent, canActivate: [AdminGuard] },
    { path: 'questions', component: QuestionsComponent, canActivate: [AdminGuard] },
    { path: 'question/:id', component: QuestionComponent, canActivate: [AdminGuard] },
    { path: 'serviceProvider/:id', component: ServiceProviderComponent, canActivate: [AdminGuard] },
    { path: 'serviceProviders', component: ServiceprovidersComponent, canActivate: [AdminGuard] },
    { path: 'customers', component: CustomersComponent, canActivate: [AdminGuard] },
    { path: 'customer/:id', component: CustomerComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent }    
];
