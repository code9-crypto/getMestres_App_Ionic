import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../model/UserModel';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Constants } from '../../shared/constants';
import alert from 'sweetalert2'
import { UserGetAllService } from '../../services/user-get-all.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  
  columns: string[] = ['Código', 'Nome', 'Email', 'isRoot', 'uid']
  dataSource!: MatTableDataSource<UserModel>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  privilege = localStorage.getItem('privilege')  

  constructor( 
    private usersGetAllSrv: UserGetAllService,
    private usersSrv: UserService,
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
    const questions = await this.usersGetAllSrv.getAll()
    this.dataSource = new MatTableDataSource(questions.data)
    this.dataSource.paginator = this.paginator
  }

  //Este função irá fazer a deleção
  async delete(model: UserModel): Promise<void>{
    const options: any = {
      //Esta forma de codificação, irá herdar
      //todas propriedades de Constants.confirm_alert_options (a qual foi importada)
      //E a propriedade text, foi criada neste instante
      ...Constants.confirm_alert_options, text: `Deseja realmente excluir o usuário ${model.name}`
    }
    const { value } = await alert.fire(options)
    if( value ){
      const result = await this.usersSrv.delete(model.uid)
      if( result.success ){
        this.matSnack.open('Deletado com sucesso', undefined, { duration: 3000 })
        this.bind()
      }
    }
  }

}{

}
