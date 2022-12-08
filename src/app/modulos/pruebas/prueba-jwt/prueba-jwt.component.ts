import { Component, OnInit } from '@angular/core';
import { PruebaJwtService } from 'src/app/servicios/pruebas/prueba-jwt.service';

import * as jwt_decode from 'jwt-decode';

declare var moment:any;

@Component({
  selector: 'app-prueba-jwt',
  templateUrl: './prueba-jwt.component.html',
  styleUrls: ['./prueba-jwt.component.css']
})
export class PruebaJwtComponent implements OnInit {

  constructor(
    private servicioPruebaJwt: PruebaJwtService
  ) { }

  createdAt;
  expiresAt;

  ngOnInit(): void {
    // this.areaProtegida();
    // this.pruebaLogin();
    
  }

  crearTiempo(){
    console.log('creando tiempos');
    this.createdAt = moment();
    this.expiresAt = moment().add(5, 'seconds');
    console.log('createdAt:', this.createdAt.format('MMMM Do YYYY, h:mm:ss a'));
    console.log('expiresAt:', this.expiresAt.format('MMMM Do YYYY, h:mm:ss a'));
  }

  comprobarTiempo(){
    console.log('Comprobar tiempo');
    console.log('Tiempo actual:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    console.log('expiresAt:', this.expiresAt.format('MMMM Do YYYY, h:mm:ss a'));
    if (this.expiresAt <= moment()) {
      console.log('Expiro');
    }else{
      console.log('vigente');
      
    }
  }

  areaProtegida(){
    this.servicioPruebaJwt.consultarAreaProtegida().subscribe(
      res => {
        const result:any = res;
        console.log(result);
       
        
      },
      err => {
        console.log('Error desde componente:');
        console.log(err);
        
      }
    )
  }

  pruebaLogin(){

    const usuario = {
      usuario: 'mike',
      password: '123hola321'
    };

    this.servicioPruebaJwt.pruebaLogin(usuario).subscribe(
      res => {
        const result:any = res;
        console.log(result);
        localStorage.setItem('token', result.token);
        const token: string = localStorage.getItem('token');
        console.log('el token es:', token);
        console.log('Token descifrado:');
        const objetoToken:any = jwt_decode(token);
        console.log(objetoToken);
        console.log('creado:', moment.unix(objetoToken.createdAt).format('MMMM Do YYYY, h:mm:ss a'));
        console.log('expira:', moment.unix(objetoToken.expiresAt).format('MMMM Do YYYY, h:mm:ss a'));
        
        
      },
      err => {
        console.log(err);
        
      }
    )
  }

  cerrarSesion(){
    localStorage.removeItem('token');
  }

}
