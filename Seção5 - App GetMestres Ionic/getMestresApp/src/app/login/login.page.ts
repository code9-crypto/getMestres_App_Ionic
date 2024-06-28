import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { UserService } from 'src/services/user.service';
import { UserAuthModel } from '../models/UserAuth';
import { Router } from '@angular/router';

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
    IonButton
  ]
})
export class LoginPage implements OnInit {

  userForm: UserAuthModel = new UserAuthModel()

  constructor(
    private userSrv: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login(){
    const { success, data } = await this.userSrv.login(this.userForm)
    if( success ){
      this.userSrv.saveDataLoginInfo(data)
      this.router.navigateByUrl('tabs')
    }
  }

}
