import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategories } from '../../interfaces/ICategories';
import { ServiceProviderService } from '../../services/serviceprovider.service';

@Component({
  selector: 'app-serviceprovider',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './serviceprovider.component.html',
  styleUrl: './serviceprovider.component.scss'
})
export class ServiceproviderComponent implements OnInit {
  
  columns: string[] = ["Código", "Nome", "Email", "Estado", "Cidades Atendidas", "Telefone"]
  dataSource!: MatTableDataSource<ICategories>

  constructor(private serviceProviderSrv: ServiceProviderService){

  }

  async ngOnInit(){
    const serviceProvider = await this.serviceProviderSrv.getAll()
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
    });
  }

}
