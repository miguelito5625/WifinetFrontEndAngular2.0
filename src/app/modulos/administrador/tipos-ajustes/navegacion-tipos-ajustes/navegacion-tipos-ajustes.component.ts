import { Component, OnInit } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-navegacion-tipos-ajustes',
  templateUrl: './navegacion-tipos-ajustes.component.html',
  styleUrls: ['./navegacion-tipos-ajustes.component.css']
})
export class NavegacionTiposAjustesComponent implements OnInit {

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
