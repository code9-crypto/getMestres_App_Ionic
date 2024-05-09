import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
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
    MatButton,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
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
    const { email, password } = this.form
    const result = await this.userService.login(email, password)
    console.log(result)
    if( result.success ){
      this.userService.configureLogin(result)
      this.router.navigateByUrl('/home')
    }else{
      this.matSnack.open("Email ou senha incorreta", undefined, { duration: 2000 })
    }
  }

}
