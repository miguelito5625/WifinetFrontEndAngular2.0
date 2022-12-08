import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { async } from '@angular/core/testing';

declare var Swal:any;

@Component({
  selector: 'app-detalles-rutas',
  templateUrl: './detalles-rutas.component.html',
  styleUrls: ['./detalles-rutas.component.css']
})
export class DetallesRutasComponent implements OnInit, OnDestroy {

  // comienza la logica de la tabla
  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  rows = [];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;

  // Termina la logica de la tabla


  formularioRuta = new FormGroup({
    nombre_ruta: new FormControl(''),
    nombre_empleado: new FormControl('')
  });

  constructor(
    private servicioRutas: RutasService,
    private servicioInstalaciones: TransaccionesInstalacionesService,
    private router: Router
  ) {
    if (!this.servicioRutas.rutaSeleccionada) {
      this.router.navigate(['/tecnicocobrador/rutas/listar']);
      return;
    }
    console.log(this.servicioRutas.rutaSeleccionada);
    
   }


  ngOnInit(): void {
    this.llenarFormulario();
    this.obtenerInstalacionesPorIdRuta(this.servicioRutas.rutaSeleccionada.id_ruta);
  }

  ngOnDestroy(){
    this.servicioRutas.rutaSeleccionada = null;
  }


  llenarFormulario(){
    this.formularioRuta.patchValue({
      nombre_ruta: this.servicioRutas.rutaSeleccionada.nombre_ruta,
      nombre_empleado: this.servicioRutas.rutaSeleccionada.nombre_empleado
    })
  }

  obtenerInstalacionesPorIdRuta(id_ruta){

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

    const subscribeInstalaciones = this.servicioInstalaciones.obtenerInstalacionesPorIdRuta(id_ruta).subscribe(
      res => {
        const result:any = res;
        console.log(result);

        this.rows = result.instalaciones;
        this.temp = [...this.rows];
        Swal.close();
        subscribeInstalaciones.unsubscribe();
      },
      async (err) => {
        console.log(err);
        subscribeInstalaciones.unsubscribe();
        await Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/tecnicocobrador/rutas/listar']);
      }
    )
  }

}
