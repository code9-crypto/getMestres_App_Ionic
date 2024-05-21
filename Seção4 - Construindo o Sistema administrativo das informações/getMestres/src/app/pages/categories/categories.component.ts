import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { CategoryService } from '../../services/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import alert from 'sweetalert2';
import { Constants } from '../../shared/constants';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginator
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  //Este array são os títulos que fazem referência ao matColumnDef do component.html
  columns: string[] = ["Código", "Nome", "Descrição", "uid"]

  dataSource!: MatTableDataSource<ICategories>
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    private categorySrv: CategoryService,        
    ){
      
  }

  async ngOnInit(){
    this.bind()
  }

  //Este método filtra e traz apenas os valores que faz referência
  //ao que foi digitado
  filter(value: string){
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }

  async bind(): Promise<void>{
    const categories = await this.categorySrv.getAll()
    this.dataSource = new MatTableDataSource(categories.data)
    this.dataSource.paginator = this.paginator
  }

  //Este função irá fazer a deleção
  async delete(category: ICategories): Promise<void>{
    const options: any = {
      //Esta forma de codificação, irá herdar
      //todas propriedades de Constants.confirm_alert_options (a qual foi importada)
      //E a propriedade text, foi criada neste instante
      ...Constants.confirm_alert_options, text: `Deseja realmente excluir a categoria ${category.name}`
    }
    const { value } = await alert.fire(options)
    if( value ){
      const result = await this.categorySrv.delete(category.uid)
      if( result.success ){
        this.bind()
      }
    }
  }

}
