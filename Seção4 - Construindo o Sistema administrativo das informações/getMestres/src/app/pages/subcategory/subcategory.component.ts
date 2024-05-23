import { Component, OnInit } from '@angular/core';
import { SubCategoryModel } from '../../model/SubCategoryModel';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CategoryModel } from '../../model/CategoryModel';
import { SubCategoryService } from '../../services/subCategory.service';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit {

  model: SubCategoryModel = new SubCategoryModel()
  categories!: Array<CategoryModel>

  constructor(
    private subCategorySrv: SubCategoryService,
    private categorySrv: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute

  ){}
  
  ngOnInit(): void {
    //este método fica ouvindo o que é recebido por paramêtro pela URL
    //Caso o paramêtro no id seja igual a new, então será aberta a tela de com os campos vazios para cadastrar nova subcategoria
    //Caso o paramêtro venha com um código, então a tela será aberta com os campos já preenchidos para apenas alteração
    this.active.params.subscribe( p => this.getId(p['id']))
    this.bindCategories()
  }

  async bindCategories(): Promise<void>{
    const result = await this.categorySrv.getAll()
    if( result.success ){
      this.categories = result.data as Array<CategoryModel>
    }
  }

  //Este método que verifica se o vem com id new ou vem com o código
  async getId(uid: string): Promise<void>{
    if( uid == 'new' ){
      return
    }
    const result = await this.subCategorySrv.getById(uid)
    this.model = result.data as SubCategoryModel
  }

  async save(): Promise<void>{
    const result = await this.subCategorySrv.post(this.model)
    if( result.success ){
      this.matSnack.open('SubCategoria salva com sucesso', undefined, { duration: 3000 })
      this.router.navigateByUrl('/subCategories')
    }
  }

}
