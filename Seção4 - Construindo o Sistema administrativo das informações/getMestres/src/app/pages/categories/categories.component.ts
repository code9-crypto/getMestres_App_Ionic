import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  columns: string[] = ["Código", "Nome", "Descrição"]
  dataSource!: MatTableDataSource<ICategories>

  constructor(
    private categorySrv: CategoryService    
    ){
      
  }

  async ngOnInit(){
    const categories = await this.categorySrv.getAll()
    console.log('passei', categories);
    this.dataSource = categories.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        name: it.name,
        description: it.description
      };
    });
  }

}
