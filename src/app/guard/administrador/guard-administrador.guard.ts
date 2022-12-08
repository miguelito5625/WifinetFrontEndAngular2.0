import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class GuardAdministradorGuard implements CanActivate {
  constructor(
    private router: Router
 ) { }


 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {

       return true;
    }
    // redirecciona a login cuando no esta logueado 
    this.router.navigate(['/login']);
    return false;
 }

 public isLoggedIn(): boolean {
    const token: string = localStorage.getItem('token');
    if (!token) {
      return false;      
    }
    const usuario:any = jwt_decode(token);
    if (usuario.puesto === "Administrador") {
       return true;
    }
    return false;
 }
  
}
