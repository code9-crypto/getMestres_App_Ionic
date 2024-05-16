import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ServiceproviderComponent } from './pages/serviceprovider/serviceprovider.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuard } from './shared/admin.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent},
    { path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard]},
    { path: 'category/:id', component: CategoryComponent, canActivate: [AdminGuard] },
    { path: 'subCategories', component: SubcategoryComponent, canActivate: [AdminGuard] },
    { path: 'questions', component: QuestionsComponent, canActivate: [AdminGuard] },
    { path: 'serviceProvider', component: ServiceproviderComponent, canActivate: [AdminGuard] },
    { path: 'customer', component: CustomerComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent }
    
];
