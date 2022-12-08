import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var moment:any;
declare var Swal:any;

@Component({
  selector: 'app-crear-usuario-empleado',
  templateUrl: './crear-usuario-empleado.component.html',
  styleUrls: ['./crear-usuario-empleado.component.css']
})
export class CrearUsuarioEmpleadoComponent implements OnInit, OnDestroy {

  nombreEmpleado;

  formularioUsuario = new FormGroup({
    nombre_usuario: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
    credencial: new FormControl('', [Validators.required])
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
    this.generarNombreUsuario();
  }

  ngOnDestroy(){
    this.servicioEmpleados.empleadoAModificar = null;
  }

  keyupNombreUsuario(){
    const nombre_usuario = this.formularioUsuario.controls.nombre_usuario.value.replace(/\s/g, "");
    this.formularioUsuario.controls.nombre_usuario.setValue(nombre_usuario);
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

    const datos = {
      id_empleado: this.servicioEmpleados.empleadoAModificar.id_empleado,
      nombre_usuario: this.formularioUsuario.controls.nombre_usuario.value,
      credencial: this.formularioUsuario.controls.credencial.value
    };

    console.log(datos);
    
    this.servicioEmpleados.crearUsuario(datos).subscribe(
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

  generarNombreUsuario(){
    const primerNombre = this.servicioEmpleados.empleadoAModificar.primer_nombre;
    const primerApellido = this.servicioEmpleados.empleadoAModificar.primer_apellido;
    const anioNacimiento = moment(this.servicioEmpleados.empleadoAModificar.fecha_nacimiento).format('DDMMYYYY');
    const usuario = `${primerNombre}${primerApellido}${anioNacimiento}`
    this.formularioUsuario.controls.nombre_usuario.setValue(usuario.toLowerCase());
  }

}
