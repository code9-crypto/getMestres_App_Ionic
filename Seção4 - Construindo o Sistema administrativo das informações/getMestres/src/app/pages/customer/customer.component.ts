import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../model/CustomerModel';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileManager, InputFileComponent } from "../../components/input-file/input-file.component";


@Component({
    selector: 'app-customer',
    standalone: true,
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterLink,
        MatButtonModule,
        InputFileComponent
    ]
})
export class CustomerComponent implements OnInit {

  model: CustomerModel = new CustomerModel()
  constructor(
    private customerSrv: CustomerService,
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
    if( uid == 'new' ){
      return
    }
    const result = await this.customerSrv.getById(uid)
    this.model = result.data as CustomerModel
  }

  async save(): Promise<void>{
    const result = await this.customerSrv.post(this.model)
    if( result.success ){
      this.matSnack.open('Pergunta salva com sucesso', undefined, { duration: 3000 })
      this.router.navigateByUrl('/questions')
    }
  }

  selectedFile(file: FileManager): void{
    if( file.base64Data ){
      this.model.photo = file.base64Data
    }
  }
}
