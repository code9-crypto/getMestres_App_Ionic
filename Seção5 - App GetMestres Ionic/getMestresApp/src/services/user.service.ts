import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { UserAuthModel } from 'src/app/models/UserAuth';
import { IUserAuth } from 'src/interfaces/IUserAuth';
import { Constants } from 'src/shared/constants';
import { IUser } from 'src/interfaces/IUser';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(public http: HttpService){
        
    }

    //Fazendo login na API
    login(user: UserAuthModel){
        return this.http.post(`${environment.url_api}/users/auth`, user)
    }

    saveDataLoginInfo(data: IUserAuth){
        localStorage.setItem(Constants.keyStore.user, JSON.stringify(data.user))
        localStorage.setItem(Constants.keyStore.token, JSON.stringify(data.token))
    }

    get UserData(): IUser{
        try{
            const saved = localStorage.getItem(Constants.keyStore.user)
            if( saved ){
                return JSON.parse(saved) as IUser
            }else{
                return {} as IUser    
            }
            
        }catch(error){
            return {} as IUser
        }
    }

}
