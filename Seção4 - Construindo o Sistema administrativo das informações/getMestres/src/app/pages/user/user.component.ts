import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { UserModel } from '../../model/UserModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FileManager, InputFileComponent } from '../../components/input-file/input-file.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { UserCreateService } from '../../services/user-create-service.service';
import { UserGetAllService } from '../../services/user-get-all.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    InputFileComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    MatCheckboxModule    
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  model: UserModel = new UserModel()  
  constructor(
    private userCreateSrv: UserCreateService,    
    private userSrv: UserService,
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
    const result = await this.userSrv.getById(uid)
    this.model = result.data as UserModel        
  }

  async salvar(): Promise<void>{
    let uid =  this.model.uid
    if( uid == undefined ){
      const result = await this.userCreateSrv.post(this.model)     
      if( result.success ){
        this.matSnack.open('Usuário salvo com sucesso', undefined, { duration: 3000 })
        this.router.navigateByUrl('/Users')
      }  
    }else{
      const result = await this.userSrv.post(this.model)     
      if( result.success ){
        this.matSnack.open('Usuário salvo com sucesso', undefined, { duration: 3000 })
        this.router.navigateByUrl('/Users')
      }
    }   
  }

  selectedFile(file: FileManager): void{
    if( file.base64Data ){
      this.model.photo = file.base64Data
    }
  }
}
