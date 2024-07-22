import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { IResultHttp } from '../interfaces/IResultHttp';
import { NgxSpinnerService } from 'ngx-spinner';
import alert from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

//Esta classe/service é aquela que se comunica direto com a API
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { 
    

  }

  private createHeader(header?: HttpHeaders): HttpHeaders{
    if( !header ){
      header = new HttpHeaders()
    }
    //Criando os cabeçalhos padrões
    header = header.append('Content-Type', 'application/json')
    header = header.append('Accept', 'application/json')

    //Pegando o token do usuário logado em localStorage e armazenando na constanten token
    //OBS.: dentro da chave getmestres:token
    const token = localStorage.getItem('getMestres:token')
    //Caso tenha alguma valor dentro da constante token
    if( token ) {
      //Então será criada um novo cabeçalho com o valor do token com a chave x-token-access
      header = header.append('x-token-access', token)
    }

    return header
  }

  public get(url: string): Promise<IResultHttp>{
    const header = this.createHeader()    
    return new Promise(async (resolve) => {
      //Método com padrão de Promise
      /*this.http.get(url, { headers: header })
        .subscribe( 
          res => { 
            resolve({ success: true , data: res, error: undefined})
          },
          err => {
            resolve({ success: false, data: undefined, error: err})
          }
        )*/

      //Método com padrdão async/await
      try{
        this.spinner.show()
        const res = await this.httpClient.get(url, { headers: header }).toPromise()        
        resolve({ success: true, data: res, error: undefined })        
        this.spinner.hide()        
      }catch(err){        
        this.spinner.hide()
        resolve({ success: false, data: {}, error: err })
        alert.fire('Atenção', 'Esta tela é acessada exclusivamente pelo administrador')
      }
    })
  }

  public post(url: string, model: any): Promise <IResultHttp>{
    let header = this.createHeader()
    return new Promise(async (resolve) => {
      try{
        this.spinner.show()
        const res = await this.httpClient.post(url, model, { headers: header }).toPromise()
        resolve({ success: true, data: res, error: undefined })
        this.spinner.hide()
        //esta tipagem no catch é para acessar qualquer atributo
      }catch(err: any){
        this.spinner.hide()        
        /*//Esta mensagem será exibida ao usuário, caso a foto seje muito grande
        if( err.status === 0 ){
          let erroFoto = '<ul>'
          erroFoto += `<li style="text-align: left">Foto muito grande para cadastrar</li>`
          erroFoto += '</ul>'
          alert.fire('Atenção', erroFoto, 'warning')
        }*/
        //Caso não seja enviado algum dos itens pedido
        //Será exibido uma mensagem de alerta na tela para o usuário
        if( err.status === 400 ){
          //Será apresentado uma tela de alerta na tela caso haja campos em branco que são obrigatórios
          let errosText = '<ul>'          
          if( Array.isArray(err.error) ) {
            //Esta forma de usar o element quando apresenta erro
            err.error.forEach((element:any) => {
            errosText += `<li style="text-align: left">${element.message || element}</li>`
          })
          errosText += '</ul>'
          //este método alert é um tipo personalizado
          alert.fire('Atenção', errosText, 'warning')
          }
        }
        resolve({ success: false, data: {},  error: err})
      }
    })
  }

  public delete(url: string): Promise<IResultHttp>{
    const header = this.createHeader()
    return new Promise(async (resolve) => {
      try{
        this.spinner.show()
        const res = await this.httpClient.delete(url, { headers: header }).toPromise()
        resolve({ success: true, data: res, error: undefined })
        this.spinner.hide()
      }catch(err){
        this.spinner.hide()
        resolve({ success: false, data: {},  error: err})
      }
    })
  }
}
