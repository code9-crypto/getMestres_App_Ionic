import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../model/CategoryModel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


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
export class CategoryComponent implements OnInit {
  category: CategoryModel = new CategoryModel();
  
  form: any = {}

  constructor(
    private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.active.params.subscribe( p => this.getId(p['id']) )
  }

  async getId(uid: string): Promise<void>{
    if( uid == 'new' ){
      return
    }
    //esta constante result, irá receber os dados
    //referente ao uid informado
    const result = await this.categoryService.getById(uid)
    //Após isso o atributo category, irá receber os dados da constante result
    //Já tipando-os como CategoryModel
    this.category = result.data as CategoryModel
    //E por conseguinte, o .html que tiver contido o ngModel do atributo category
    //especificando o atributo DA CATEGORY(name, description...)
    //será preenchido automaticamente
    console.log(this.category)
  }

  async save(): Promise<void>{    
    const result = await this.categoryService.post(this.category)    
    if( result.success ){
      this.matSnack.open("Categoria salva com sucesso", undefined, { duration: 4000 })
      this.router.navigateByUrl('/categories')
    }
    console.log(result)
  }
  
}
