import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  //Este é o método de mensagem usando toast
  async toast(title: string, position: any = 'top'): Promise<void>{
    const toast = await this.toastController.create({ message: title, position, duration: 5000})
    await toast.present()
  }

  //Este é o método de mensagem usando alert
  async alert(title: string, message: string): Promise<void>{
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['ok'],
      //Este chave backdropDismiss, faz com que caso clique fora do alert, mantenha a mensagem aberta porque foi setado como false
      backdropDismiss: false
    })
    await alert.present()
  }

  //Este é o método de mensagem usando confirm
  async confirm(title: string, message: string, callback: any): Promise<void>{
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons:[
        { text: "Não", role: "Cancel", handler: () => { 
          console.log("Confirm:Say:No")
         } },
        { text: "Sim", handler: () => { callback() } }
      ]
    })
    await alert.present()
  }
}
