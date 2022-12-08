import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { Router } from '@angular/router';


declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-modificar-rutas',
  templateUrl: './modificar-rutas.component.html',
  styleUrls: ['./modificar-rutas.component.css']
})
export class ModificarRutasComponent implements OnInit, OnDestroy {

  listaEmpleados: any = [];

  formularioRuta = new FormGroup({
    id_usuario: new FormControl('', [Validators.required]),
    nombre_ruta: new FormControl('', [Validators.required])
  })

  constructor(
    private servicioEmpleados: EmpleadosService,
    private servicioRutas: RutasService,
    private router: Router
  ) { 
    if (!this.servicioRutas.rutaSeleccionada) {
      this.router.navigate(['/administrador/rutas/listar']);
      return;
    }
    console.log(this.servicioRutas.rutaSeleccionada);
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.llenarFormulario();
  }

  ngOnDestroy(){
    this.servicioRutas.rutaSeleccionada = null;
  }

  onSubmit(){

    if (!this.formularioRuta.valid) {
      Swal.fire({
       icon: 'error',
       title: 'Hay campos incorrectos',
       text: 'Por favor llene cada campo correctamente',
       showCloseButton: true,
       // showCancelButton: true,
       confirmButtonText: 'Entedido',
     });
     return;
   }

   Swal.fire({
     title: 'Procesando',
     icon: 'info',
     html: 'Por favor, espere',
     timerProgressBar: true,
     allowOutsideClick: false,
     onBeforeOpen: () => {
       Swal.showLoading()
     }
   });

    const datos = {
      id_ruta: this.servicioRutas.rutaSeleccionada.id_ruta,
      nombre_ruta: this.formularioRuta.controls.nombre_ruta.value,
      id_usuario: this.formularioRuta.controls.id_usuario.value
    };

    const subscribeModificarRuta = this.servicioRutas.actualizarRuta(datos).subscribe(
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
        
        subscribeModificarRuta.unsubscribe();

        this.router.navigate(['/administrador/rutas/listar']);
      },
      err =>{
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeModificarRuta.unsubscribe();
      }
    )
    

  }

  llenarFormulario() {
    this.formularioRuta.patchValue({
      id_usuario: this.servicioRutas.rutaSeleccionada.id_usuario,
      nombre_ruta: this.servicioRutas.rutaSeleccionada.nombre_ruta
    })
  }

  obtenerEmpleados() {

    Swal.fire({
      title: 'Cargando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const subcribeEmpleados = this.servicioEmpleados.obtenerEmpleadosEmpleadosConUsuario().subscribe(
      res => {
        const result: any = res;
        this.listaEmpleados = result.empleados;
        // console.log(this.listaEmpleados);

        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          $('#selectPuesto').selectpicker('val', this.servicioRutas.rutaSeleccionada.id_usuario);
        }, 200);
        Swal.close();
        subcribeEmpleados.unsubscribe();
      },
      err => {
        console.log(err);
        subcribeEmpleados.unsubscribe();
      }
    )
  }

}
