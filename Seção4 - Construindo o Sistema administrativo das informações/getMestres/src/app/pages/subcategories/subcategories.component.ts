import { Component, OnInit, ViewChild } from '@angular/core';
import { SubCategoriesService } from '../../services/subCategories.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SubCategoryModel } from '../../model/SubCategoryModel';
import { MatPaginator } from '@angular/material/paginator';
import alert from 'sweetalert2';
import { Constants } from '../../shared/constants';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [
    MatTableModule, 
    MatIconModule, 
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator
  ],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnInit{
  //Os nomes dentro deste array, fazem referência aos nomes das columns no .html
  columns: string[] = ["Código", "Nome", "Descrição", "Categoria", "uid"]
  dataSource!: MatTableDataSource<SubCategoryModel>
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private subCategoriesSrv: SubCategoriesService){
  }

  async ngOnInit(){
    /*const subCategories = await this.subCategorySrv.getAll()
    console.log('passei', subCategories);
    this.dataSource = subCategories.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        name: it.name,
        description: it.description
      };
    });*/
    this.bind()
  }

  async bind(): Promise<void>{
    const subCategories = await this.subCategoriesSrv.getAll()
    this.dataSource = new MatTableDataSource(subCategories.data)
    this.dataSource.paginator = this.paginator
  }

  //Este método filtra e traz apenas os valores que faz referência
  //ao que foi digitado
  filter(value: string){
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }

  //Este função irá fazer a deleção
  async delete(subCategory: SubCategoryModel): Promise<void>{
    const options: any = {
      //Esta forma de codificação, irá herdar
      //todas propriedades de Constants.confirm_alert_options (a qual foi importada)
      //E a propriedade text, foi criada neste instante
      ...Constants.confirm_alert_options, text: `Deseja realmente excluir a SubCategoria ${subCategory.name}`
    }
    const { value } = await alert.fire(options)
    if( value ){
      const result = await this.subCategoriesSrv.delete(subCategory.uid)
      if( result.success ){
        this.bind()
      }
    }
  }
}
