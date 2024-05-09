import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate{
    
    constructor(
        private userServer: UserService,
        private router: Router
    ){

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if( this.userServer.isStaticLogged ){
            return true
        }else{
            this.router.navigateByUrl('/login')
            return false
        }
    }

}