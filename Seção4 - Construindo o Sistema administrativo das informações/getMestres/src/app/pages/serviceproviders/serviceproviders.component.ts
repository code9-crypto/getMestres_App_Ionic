import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { ServiceProvidersService } from '../../services/serviceproviders.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceProviderModel } from '../../model/ServiceProviderModel';
import { Constants } from '../../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import  alert  from 'sweetalert2'

@Component({
  selector: 'app-serviceprovider',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatPaginator
  ],
  templateUrl: './serviceproviders.component.html',
  styleUrl: './serviceproviders.component.scss'
})
export class ServiceprovidersComponent implements OnInit {
  
  columns: string[] = ["Código", "Nome", "Email", "Estado", "Cidades Atendidas", "Telefone", "uid"]
  dataSource!: MatTableDataSource<ServiceProviderModel>  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  matSnack!: MatSnackBar  

  constructor(private serviceProvidersSrv: ServiceProvidersService){}

  async ngOnInit(){
    /*const serviceProvider = await this.serviceProvidersSrv.getAll()
    console.log('passei', serviceProvider);
    this.dataSource = serviceProvider.data.map((it: ICategories) => {
      return {
        uid: it.uid,
        name: it.name,
        email: it.email,
        state: it.state,
        citiesCare: it.citiesCare,
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
    const service = await this.serviceProvidersSrv.getAll()
    this.dataSource = new MatTableDataSource(service.data)
    this.dataSource.paginator = this.paginator
    console.log(this.dataSource)    
  }

  //Este função irá fazer a deleção
  async delete(model: ServiceProviderModel): Promise<void>{
    const options: any = {
      //Esta forma de codificação, irá herdar
      //todas propriedades de Constants.confirm_alert_options (a qual foi importada)
      //E a propriedade text, foi criada neste instante
      ...Constants.confirm_alert_options, text: `Deseja realmente excluir o profissional ${model.name}`
    }
    const { value } = await alert.fire(options)
    if( value ){
      const result = await this.serviceProvidersSrv.delete(model.uid)
      if( result.success ){
        this.matSnack.open('Deletado com sucesso', undefined, { duration: 3000 })
        this.bind()
      }
    }
  }
}
