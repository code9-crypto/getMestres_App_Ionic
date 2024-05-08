import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  
  columns: string[] = ['Código', 'Nome', 'Email', 'Telefone']
  dataSource!: MatTableDataSource<ICategories>

  constructor( private customerSrv: CustomerService){
  }
  
  async ngOnInit(){
    const customer = await this.customerSrv.getAll()
    console.log('passei', customer);
    this.dataSource = customer.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        name: it.name,
        email: it.email,
        phone: it.phone
      };
    });
  }

}
