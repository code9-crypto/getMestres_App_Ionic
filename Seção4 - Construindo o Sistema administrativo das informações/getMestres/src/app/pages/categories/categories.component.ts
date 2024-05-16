import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { CategoryService } from '../../services/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  columns: string[] = ["Código", "Nome", "Descrição"]
  dataSource!: MatTableDataSource<ICategories>

  constructor(
    private categorySrv: CategoryService,        
    ){
      
  }

  async ngOnInit(){
    const categories = await this.categorySrv.getAll()
    this.dataSource = new MatTableDataSource(categories.data)
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }

}
