import { Component, OnInit } from '@angular/core';
import { ICategories } from '../../interfaces/ICategories';
import { SubCategoryService } from '../../services/subCategory.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit{

  columns: string[] = ["Código", "Nome", "Descrição"]
  dataSource!: MatTableDataSource<ICategories>

  constructor(private subCategorySrv: SubCategoryService){
  }

  async ngOnInit(){
    const subCategories = await this.subCategorySrv.getAll()
    console.log('passei', subCategories);
    this.dataSource = subCategories.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        name: it.name,
        description: it.description
      };
    });
  }
}
