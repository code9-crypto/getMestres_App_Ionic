import { Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ServiceproviderComponent } from './pages/serviceprovider/serviceprovider.component';
import { CustomerComponent } from './pages/customer/customer.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'categories', component: CategoriesComponent},
    { path: 'categories/:id', component: CategoryComponent },
    { path: 'subCategories', component: SubcategoryComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'serviceProvider', component: ServiceproviderComponent },
    { path: 'customer', component: CustomerComponent }
    
];
