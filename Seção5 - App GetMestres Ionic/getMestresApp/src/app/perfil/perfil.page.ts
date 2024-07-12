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

  async save(){
    const { success, data, error } = await this.customerSrv.post(this.form)
    if( success ){
      this.form = data
      this.alertSrv.toast('Perfil atualizado com sucesso')
    }else if(error.status == 401){
      this.alertSrv.toast('Você não está autorizado para esta funcionalidade')
    }
  }

  async changePasswordHandle(currentPassword: string,  newPassword: string, confirmNewPassword: string){
    const { success } = await this.customerSrv.changePassword(currentPassword, newPassword, confirmNewPassword)
    if( success ){
      this.alertSrv.toast('Senha alterada com sucesso')
    }
  }

  //Este método irá abrir um alerta na tela do usuário
  //com os campos para alterar a senha
  async changePassword(){
    //currentPassword, newPassword, confirmNewPassword
    (await this.alertCtrl.create({
      header: 'Trocar Senha',
      inputs: [
        { placeholder: 'Digite sua senha atual', type: 'password', name: 'currentPassword' },
        { placeholder: 'Digite a nova senha', type: 'password', name: 'newPassword' },
        { placeholder: 'Digite a confirmação da senha', type: 'password', name: 'confirmNewPassword' }
      ],
      buttons: [
        { text: 'Cancelar', handler: () => { } },
        { text: 'Salvar', handler: ({ currentPassword,  newPassword, confirmNewPassword}) => {
            if( !newPassword || !confirmNewPassword || !currentPassword ){
              this.alertSrv.toast('Digite todas as informações antes de continuar')
              return 
            }else{              
              this.changePasswordHandle(currentPassword, newPassword, confirmNewPassword)

            }
          } 
        }        
      ]
    })).present()  }

}
