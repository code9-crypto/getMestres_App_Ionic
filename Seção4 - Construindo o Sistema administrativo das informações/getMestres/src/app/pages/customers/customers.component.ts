import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { CustomerModel } from '../../model/CustomerModel';
import { MatPaginator } from '@angular/material/paginator';
import { Constants } from '../../shared/constants';
import  alert  from 'sweetalert2'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatTableModule, 
    MatCard, 
    MatCardTitle,
    MatSnackBarModule,
    RouterLink,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{
  
  columns: string[] = ['Código', 'Nome', 'Email', 'Telefone', 'uid']
  dataSource!: MatTableDataSource<CustomerModel>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  

  constructor( 
    private customersSrv: CustomersService,
    private matSnack: MatSnackBar

  ){}
  
  async ngOnInit(){
    /*const customer = await this.customersSrv.getAll()
    console.log('passei', customer);
    this.dataSource = customer.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        name: it.name,
        email: it.email,
        phone: it.phone
      };
    });*/
    this.bind()
  }

  //Este método filtra e traz apenas os valores que faz referência
  //ao que foi digitado
  filter(value: string){
    this.dataSource.filter = value.trim().toLocaleLowerCase()
  }

  async bind(): Promise<void>{
    const customer = await this.customersSrv.getAll()
    this.dataSource = new MatTableDataSource(customer.data)
    this.dataSource.paginator = this.paginator
  }

  //Este função irá fazer a deleção
  async delete(model: CustomerModel): Promise<void>{
    const options: any = {
      //Esta forma de codificação, irá herdar
      //todas propriedades de Constants.confirm_alert_options (a qual foi importada)
      //E a propriedade text, foi criada neste instante
      ...Constants.confirm_alert_options, text: `Deseja realmente excluir o cliente ${model.name}`
    }
    const { value } = await alert.fire(options)
    if( value ){
      const result = await this.customersSrv.delete(model.uid)
      if( result.success ){
        this.matSnack.open('Deletado com sucesso', undefined, { duration: 3000 })
        this.bind()
      }
    }
  }

}
