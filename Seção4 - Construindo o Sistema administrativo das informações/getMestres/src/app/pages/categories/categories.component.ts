import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  columns: string[] = ["Nome", "Descrição"]
  dataSource: MatTableDataSource<ICategories>

  constructor(){

  }

  ngOnInit(): void {
    
  }

}
