import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonInput, IonButtons, IonButton } from '@ionic/angular/standalone';
import { CustomerService } from 'src/services/customer.service';
import { UserService } from 'src/services/user.service';
import { CustomerModel } from '../models/CustomerModel';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/services/alert.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonList, 
    IonLabel, 
    IonItem, 
    IonInput,
    IonButtons, 
    IonButton   
  ]
})
export class PerfilPage implements OnInit { 
  //Obs.: os atributos que ficam fora do construtor, são usados pela página HTML
  form: CustomerModel = new CustomerModel()

  constructor(
    //Enquanto os atributos que ficam dentro do construtor, são usados dentro da lógica do arquivo .ts
    private customerSrv: CustomerService,
    private userSrv: UserService,
    private alertCtrl: AlertController,
    private alertSrv: AlertService
  ) { }

  ionViewDidEnter(){
    this.loadData()
  }

  ngOnInit() {
    
  }

  async loadData(){
    const { success, data } = await this.customerSrv.getById(this.userSrv.UserData.uid)
    if( success ){
      this.form = data as CustomerModel
    }
  }

  save(){

  }

  //Este método irá abrir um alerta na tela do usuário
  //com os campos para alterar a senha
  async changePassword(){
    (await this.alertCtrl.create({
      header: 'Trocar Senha',
      inputs: [
        { placeholder: 'Digite a nova senha', type: 'password', name: 'inputPassword' }
      ],
      buttons: [
        { text: 'Cancelar', handler: () => { } },
        { text: 'Salvar', handler: (data) => {
            if( !data.inputPassword ){
              this.alertSrv.toast('Digite a nova senha antes de continuar')
              return
            }
          } 
        }        
      ]
    })).present()  }

}
