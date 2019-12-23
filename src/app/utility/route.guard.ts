import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
    constructor(private dataService:DataService,
      private router:Router){}

      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          let isLoggedIn = this.dataService.getDataFromStore('user_details') ? true:false;
          if(state.url === '/login'){
            if(isLoggedIn){
              this.router.navigate(["/gallery"]);
              return false;
            }else{
              return true;
            }
          }else{
            if(isLoggedIn){
              return true;
            }else{
              this.router.navigate(["/login"]);
              return false;
            }
          }
      }
    }
