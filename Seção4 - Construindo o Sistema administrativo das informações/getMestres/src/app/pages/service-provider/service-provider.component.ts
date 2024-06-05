import { Component, OnInit } from '@angular/core';
import { ServiceProviderModel } from '../../model/ServiceProviderModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceProviderService } from '../../services/service-provider.service';
import { FileManager } from '../../components/input-file/input-file.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFileComponent } from '../../components/input-file/input-file.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-service-provider',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    InputFileComponent,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.scss'
})
export class ServiceProviderComponent implements OnInit {

  model: ServiceProviderModel = new ServiceProviderModel()  
  constructor(
    private serviceSrv: ServiceProviderService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    //este método fica ouvindo o que é recebido por paramêtro pela URL
    //Caso o paramêtro no id seja igual a new, então será aberta a tela de com os campos vazios para cadastrar nova subcategoria
    //Caso o paramêtro venha com um código, então a tela será aberta com os campos já preenchidos para apenas alteração
    this.active.params.subscribe( p => this.getId(p['id']))
  }

  //Este método que verifica se o vem com id new ou vem com o código
  async getId(uid: string): Promise<void>{
    if( uid === 'new' ){
      return
    }
    const result = await this.serviceSrv.getById(uid)
    this.model = result.data as ServiceProviderModel        
  }

  async save(): Promise<void>{    
    const result = await this.serviceSrv.post(this.model)     
    if( result.success ){
      this.matSnack.open('Prestador salvo com sucesso', undefined, { duration: 3000 })
      this.router.navigateByUrl('/serviceProviders')
    }    
  }

  selectedFile(file: FileManager): void{
    if( file.base64Data ){
      this.model.photo = file.base64Data
    }
  }
}
