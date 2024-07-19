import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { UserService } from 'src/services/user.service';
import { UserAuthModel } from '../models/UserAuth';
import { Router } from '@angular/router';
import { ISelect } from 'src/interfaces/ISelect';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonList,
    IonItem, 
    IonLabel, 
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption
  ]
})
export class LoginPage implements OnInit {

  //Estes atributos estão fora do construtor, pois serão usados no arquivo HTML
  userForm: UserAuthModel = new UserAuthModel()
  profiles: ISelect[] = [
    { value: 'customer', label: 'Cliente' },
    { value: 'serviceProvider', label: 'Prestador' }
  ]


  constructor(
    private userSrv: UserService,
    private router: Router,
    private alertSrv: AlertService
  ) { }

  //Este método carregará a página toda vez que a página for carregada
  ionViewDidEnter(){
    let email: any = document.querySelector('ion-input[name="email"]')
    let password: any = document.querySelector('ion-input[name="password"]')
    let perfil: any = document.querySelector('ion-select[name="profile"]')
    email.value = ''
    password.value = ''
    perfil.value = ''    
  }

  ngOnInit() {
    
  }

  async login(){
    const { email, password, profile } = this.userForm
    if( !email || !password || !profile ){
      this.alertSrv.alert('Atenção','Preencha todos os dados para efetuar o login')
      return
    }
    const { success, data, error } = await this.userSrv.login(this.userForm)
    if( success ){
      this.userSrv.saveDataLoginInfo(data, this.userForm.profile);
      setTimeout(() => {
        this.router.navigateByUrl('/tabs')  
      }, 200)      
    }else if( error.status == 404 ){
      this.alertSrv.alert('Atenção', 'Login ou senha inválidos')
    }

  }

  /*
  Este método ficará aqui comentado apenas para informar
  que é possível fazer acesso a API de qualquer lugar do código
  apenas precisa-se tipar o atributo como httpService, pois é esta classe/service que faz o acesso a API
  usando os verbos HTTP - GET, POST, PUT, DELETE

  async carregaCategorias(){
    const result = await this.http.get(`${environment.url_api}/category`)
    console.log(result)
  }
  */

}
