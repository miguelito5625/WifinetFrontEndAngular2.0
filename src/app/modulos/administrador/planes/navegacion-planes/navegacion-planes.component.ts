import { Component, OnInit } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-navegacion-planes',
  templateUrl: './navegacion-planes.component.html',
  styleUrls: ['./navegacion-planes.component.css']
})
export class NavegacionPlanesComponent implements OnInit {

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
