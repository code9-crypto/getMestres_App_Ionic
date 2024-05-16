import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../model/CategoryModel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICategories } from '../../interfaces/ICategories';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  category: CategoryModel = new CategoryModel();
  
  form: any = {}

  constructor(
    private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router
  ){}

  async save(): Promise<void>{    
    const result = await this.categoryService.post(this.category)    
    if( result.success ){
      this.matSnack.open("Categoria salva com sucesso", undefined, { duration: 3000 })
      this.router.navigateByUrl('/categories')
    }
    console.log(result)
  }
  
}
