import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonTitle, IonToolbar, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { AlertService } from 'src/services/alert.service';
import { ServiceProviderService } from 'src/services/serviceProvider.service';
import { UserService } from 'src/services/user.service';
import { ServiceProviderModel } from '../models/ServiceProviderModel';
import { AddressService } from 'src/services/Address.service';
import { IAddressState } from 'src/interfaces/IAddressState';

@Component({
  selector: 'app-perfil-profissional',
  templateUrl: './perfil-profissional.page.html',
  styleUrls: ['./perfil-profissional.page.scss'],
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
    IonButton,
    IonItemDivider,
    IonSelect,
    IonSelectOption
  ]
})
export class PerfilProfissionalPage {

  //Obs.: os atributos que ficam fora do construtor, são usados pela página HTML
  form: ServiceProviderModel = new ServiceProviderModel()
  cities: Array<string> = new Array<string>()
  citiesCare: Array<string> = new Array<string>()
  states: Array<IAddressState> = new Array<IAddressState>()

  constructor(
    //Enquanto os atributos que ficam dentro do construtor, são usados dentro da lógica do arquivo .ts
    private userSrv: UserService,
    private alertCtrl: AlertController,
    private alertSrv: AlertService,
    private serviceProviderSrv: ServiceProviderService,    
    private citySrv: AddressService
  ) { }

  //Este método fará com que seja carregado toda vez
  //que a tela for carregada
  ionViewDidEnter(){
    this.loadData()
    this.loadStates()
  }

  async loadData(){    
    const { success, data } = await this.serviceProviderSrv.getById(this.userSrv.UserData.uid)
    if( success ){
      this.form = data as ServiceProviderModel
    }
  }

  async save(){    
    const { success, data, error } = await this.serviceProviderSrv.post(this.form as ServiceProviderModel)
    if( success ){
      this.form = data
      this.alertSrv.toast('Perfil atualizado com sucesso')
    }else if(error.status == 401){
      this.alertSrv.toast('Você não está autorizado para esta funcionalidade')
    }
  }

  async changePasswordHandle(currentPassword: string,  newPassword: string, confirmNewPassword: string){    
    const { success } = await this.serviceProviderSrv.changePassword(currentPassword, newPassword, confirmNewPassword)
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

  logout(){
    this.userSrv.logout()
  }

  async loadStates(){
    const { success, data } = await this.citySrv.getAllStates()
    if( success ){
      this.states = data as IAddressState[]
    }
  }

  async selectState(evt: any){
    const state = evt.detail.value
    const { success, data } = await this.citySrv.getAllCities(state) 
    if( success ){
      this.cities = data as string[]
    }
  }

}
