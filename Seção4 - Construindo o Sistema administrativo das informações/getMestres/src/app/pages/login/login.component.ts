import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard, 
    MatCardTitle, 
    MatCardContent, 
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  //este é uma forma que pega as informações dos campos de texto da tela
  //é criado um form como objeto, pois quando for acessa-los, será pela sua chave
  form: any = {}

  constructor( 
    private userService: UserService,
    private matSnack: MatSnackBar,
    private router: Router
    ){

  }
  
  ngOnInit(){
    if( this.userService.isStaticLogged ){
      this.router.navigateByUrl('/home')
    }
  }

  async login():Promise<void>{
    //pegando os valores pelo formulário
    //Fazendo o destructing dos valores recebidos dentro do form
    const { email, password } = this.form
    const result = await this.userService.login(email, password)    
    if( result.success ){
      this.userService.configureLogin(result)
      this.router.navigateByUrl('/home')
    }else{
      this.matSnack.open("Email ou senha incorreta", undefined, { duration: 2000 })
    }
  }

}
