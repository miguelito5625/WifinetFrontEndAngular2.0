import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-navegacion-boletas-deposito',
  templateUrl: './navegacion-boletas-deposito.component.html',
  styleUrls: ['./navegacion-boletas-deposito.component.css']
})
export class NavegacionBoletasDepositoComponent implements OnInit {

  usuario:any;

  constructor(
    private servicioAutenticacion: AutenticacionService
  ) {
    this.obtenerUsuario();
   }

  ngOnInit(): void {
  }

  obtenerUsuario(){
    const token: string = localStorage.getItem('token');
    if (token) {
      this.usuario = jwt_decode(token);
    }
  }

  cerrarSesion(){
    this.servicioAutenticacion.cerrarSesion();
  }


}
