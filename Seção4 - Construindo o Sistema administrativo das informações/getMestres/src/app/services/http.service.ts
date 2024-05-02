import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { IResultHttp } from '../interfaces/IResultHttp';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { 
    

  }

  private createHeader(header?: HttpHeaders): HttpHeaders{
    if( !header ){
      header = new HttpHeaders()
    }

    header = header.append("Content-Type", "application/json")
    header = header.append("Accept", "application/json")

    let token: string = ""
    if( token ) {
      header = header.append("x-token-access", token)
    }

    return header
  }

  public get(url: string): Promise<IResultHttp>{
    let header: any = this.createHeader()
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
        const res = await this.http.get(url, { headers: header })
        resolve({ success: true, data: res, error: undefined })
        this.spinner.hide()
      }catch(err){        
        this.spinner.hide()
        resolve({ success: false, data: {}, error: err })
      }
    })
  }

  public post(url: string, model: any): Promise <IResultHttp>{
    let header = this.createHeader()
    return new Promise(async (resolve) => {
      try{
        this.spinner.show()
        const res = await this.http.post(url, model, { headers: header })
        resolve({ success: true, data: res, error: undefined })
        this.spinner.hide()
      }catch(err){
        this.spinner.hide()
        resolve({ success: false, data: {},  error: err})
      }
    })
  }

  public delete(url: string): Promise<IResultHttp>{
    const header = this.createHeader()
    return new Promise(async (resolve) => {
      try{
        this.spinner.show()
        const res = await this.http.post(url, model, { headers: header })
        resolve({ success: true, data: res, error: undefined })
        this.spinner.hide()
      }catch(err){
        this.spinner.hide()
        resolve({ success: false, data: {},  error: err})
      }
    })
  }
}
