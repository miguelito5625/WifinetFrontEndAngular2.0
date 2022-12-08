import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormGroup, FormControl } from '@angular/forms';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

declare var Swal:any;

@Component({
  selector: 'app-quitar-instalaciones-rutas',
  templateUrl: './quitar-instalaciones-rutas.component.html',
  styleUrls: ['./quitar-instalaciones-rutas.component.css']
})
export class QuitarInstalacionesRutasComponent implements OnInit, OnDestroy {

  // comienza la logica de la tabla
  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  selected = [];

  rows = [];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
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
      this.router.navigate(['/administrador/rutas/listar']);
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

  onSubmit(){

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

    const id_instalaciones = this.selected.map(element => {
      return element.id_instalacion;
    });
    
    const datos = {
      id_ruta: this.servicioRutas.rutaSeleccionada.id_ruta,
      id_instalaciones
    }

    const subscribeQuitarInstalaciones = this.servicioRutas.quitarInstalacionesDeRuta(datos).subscribe(
      async res => {
        const result:any = res;
        console.log(result);

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        
        subscribeQuitarInstalaciones.unsubscribe();

        this.router.navigate(['/administrador/rutas/listar']);
        
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeQuitarInstalaciones.unsubscribe();
      }
    );

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
        this.router.navigate(['/administrador/rutas/listar']);
      }
    )
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    console.log(this.selected);
    
  }


}
