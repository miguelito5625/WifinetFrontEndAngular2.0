import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

declare var Swal:any;
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin = new FormGroup({
    inputUsuario: new FormControl(''),
    inputPassword: new FormControl('')
  })

  constructor(
    private servicioAutenticacion: AutenticacionService,
    private router: Router
  ) {
    this.comprobarSiExisteSesion();
   }

  ngOnInit(): void {
  }

  comprobarSiExisteSesion(){
    const token: string = localStorage.getItem('token');
    if (token) {
      const usuario = jwt_decode(token);
      console.log(usuario);
      if (usuario.puesto === 'Administrador') {
        this.router.navigate(['/administrador/principal-administrador']);
        return;
      }
      if (usuario.puesto === 'Técnico/Cobrador') {
        this.router.navigate(['/tecnicocobrador/principal']);
        return;
      }
    }
  }

  iniciarSesion(){

    Swal.fire({
      title: 'Iniciando sesión...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });


    const data = { 
      nombre_usuario: this.formularioLogin.value.inputUsuario,
      credencial: this.formularioLogin.value.inputPassword
    };

    const subscribeLogin = this.servicioAutenticacion.iniciarSesion(data).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        const usuario:any = jwt_decode(res.token);
        this.servicioAutenticacion.usuarioLogueado = usuario;
        console.log(usuario);
        Swal.close();

        if (usuario.puesto === 'Administrador') {
          subscribeLogin.unsubscribe();
          console.log('Es administrador');
          this.router.navigate(['/administrador']);
        }

        if (usuario.puesto === 'Técnico/Cobrador') {
          subscribeLogin.unsubscribe();
          console.log('Es Técnico/Cobrador');
          this.router.navigate(['/tecnicocobrador']);
        }

      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeLogin.unsubscribe();
      }
    )
  }

}
