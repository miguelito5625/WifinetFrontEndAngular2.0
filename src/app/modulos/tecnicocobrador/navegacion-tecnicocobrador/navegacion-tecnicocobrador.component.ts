import { Component, OnInit } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

@Component({
  selector: 'app-navegacion-tecnicocobrador',
  templateUrl: './navegacion-tecnicocobrador.component.html',
  styleUrls: ['./navegacion-tecnicocobrador.component.css']
})
export class NavegacionTecnicocobradorComponent implements OnInit {

  usuario:any;

  constructor(
    private servicioAutenticacion: AutenticacionService
  ) {
    this.obtenerUsuario();
   }

  ngOnInit(): void {
  }

  obtenerUsuario(){
    // const token: string = localStorage.getItem('token');
    // if (token) {
    //   this.usuario = jwt_decode(token);
    // }
    this.usuario = this.servicioAutenticacion.usuarioLogueado;
  }

  cerrarSesion(){
    this.servicioAutenticacion.cerrarSesion();
  }

}
