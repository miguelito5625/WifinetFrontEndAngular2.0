import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var Swal:any;

@Component({
  selector: 'app-modificar-usuario-empleado',
  templateUrl: './modificar-usuario-empleado.component.html',
  styleUrls: ['./modificar-usuario-empleado.component.css']
})
export class ModificarUsuarioEmpleadoComponent implements OnInit, OnDestroy {

  nombreEmpleado;
  cambioCredencial:boolean = false;

  formularioUsuario = new FormGroup({
    nombre_usuario: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
    credencial: new FormControl('')
  });

  constructor(
    private servicioEmpleados: EmpleadosService,
    private router: Router 
  ) {
    if (!this.servicioEmpleados.empleadoAModificar) {
      this.router.navigate(['/administrador/empleados/listar']);
      return;
    }
    console.log(this.servicioEmpleados.empleadoAModificar);
    this.nombreEmpleado = this.servicioEmpleados.empleadoAModificar.nombre_completo;
   }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  llenarFormulario(){
    this.formularioUsuario.patchValue({
      nombre_usuario: this.servicioEmpleados.empleadoAModificar.nombre_usuario
    });
  }

  keyUpCredencial(){
    this.cambioCredencial = true;
  }

  keyupNombreUsuario(){
    const nombre_usuario = this.formularioUsuario.controls.nombre_usuario.value.replace(/\s/g, "");
    this.formularioUsuario.controls.nombre_usuario.setValue(nombre_usuario);
  }

  ngOnDestroy(){
    this.servicioEmpleados.empleadoAModificar = null;
  }

  onSubmit(){

    if (!this.formularioUsuario.valid) {
      Swal.fire({
       icon: 'error',
       title: 'Hay campos incorrectos',
       text: 'Por favor llene cada campo correctamente',
       showCloseButton: true,
       confirmButtonText: 'Entedido',
     });
     return;
   }

   Swal.fire({
     title: 'Creando',
     icon: 'info',
     html: 'Por favor, espere',
     timerProgressBar: true,
     allowOutsideClick: false,
     onBeforeOpen: () => {
       Swal.showLoading()
     }
   });

    let datos:any = {
      id_usuario: this.servicioEmpleados.empleadoAModificar.id_usuario,
      nombre_usuario: this.formularioUsuario.controls.nombre_usuario.value,
      // credencial: this.formularioUsuario.controls.credencial.value
    };

    if (this.cambioCredencial === true) {
      datos.credencial = this.formularioUsuario.controls.credencial.value;
    }



    console.log(datos);
    
    this.servicioEmpleados.modificarUsuario(datos).subscribe(
      async (res) => {
        const result:any = res;
        console.log(result);
        
        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });

        this.router.navigate(['/administrador/empleados/listar']);

      },
      err => {
        console.log(err);
        if (err.message) {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'Servidor no responde',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    );

  }

}
