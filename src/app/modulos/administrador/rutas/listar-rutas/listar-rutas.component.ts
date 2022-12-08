import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { async } from '@angular/core/testing';

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-listar-rutas',
  templateUrl: './listar-rutas.component.html',
  styleUrls: ['./listar-rutas.component.css']
})
export class ListarRutasComponent implements OnInit, OnDestroy {

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

  constructor(
    private servicioRutas: RutasService,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.obtenerRutas();
  }

  ngOnDestroy(){
    $('.tooltip').remove();
  }

  detalleRuta(ruta){
    this.servicioRutas.rutaSeleccionada = ruta;
    this.router.navigate(['/administrador/rutas/detalle']);
  }

  quitarInstalacionesRuta(ruta){
    this.servicioRutas.rutaSeleccionada = ruta;
    this.router.navigate(['/administrador/rutas/quitar-instalaciones']);
  }

  agregarInstalacionesRuta(ruta){
    this.servicioRutas.rutaSeleccionada = ruta;
    this.router.navigate(['/administrador/rutas/agregar-instalaciones']);
  }

  editarRuta(ruta){
    this.servicioRutas.rutaSeleccionada = ruta;
    this.router.navigate(['/administrador/rutas/modificar']);
  }

  trazarRuta(ruta){
    this.servicioRutas.rutaSeleccionada = ruta;
    this.router.navigate(['/administrador/rutas/trazar-ruta']);
  }

  gestionarInstalaciones(ruta){
    this.servicioRutas.rutaSeleccionada = ruta;
    this.router.navigate(['/administrador/rutas/gestionar-instalaciones']);
  }

  async eliminarRuta(ruta){
    if (ruta.cantidad_instalaciones > 0) {

      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar hasta que quite todas las instalaciones de esta ruta',
        showCloseButton: true,
        confirmButtonText: 'Entendido!',
      });
      return;
    }

    
    const darDeBaja = await Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar esta ruta?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });

    if (darDeBaja.isConfirmed) {

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

    const subscribeEliminarRuta =  this.servicioRutas.eliminarRuta({id_ruta: ruta.id_ruta}).subscribe(
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
          
          subscribeEliminarRuta.unsubscribe();
          this.obtenerRutas();
        },
        err => {
          console.log(err);
          subscribeEliminarRuta.unsubscribe();
          Swal.fire({
            title: 'Error!',
            text: 'Servidor no responde',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          
        }
      )
      
    }

  }

  obtenerRutas(){

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

    const subcribeObtenerRutas = this.servicioRutas.obtenerRutas().subscribe(
      res => {
        const result: any = res;
        console.log(result.rutas);

        this.rows = result.rutas;
        this.temp = [...this.rows];
        subcribeObtenerRutas.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerRutas.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (index) {
      return (index.nombre_ruta.toLowerCase().indexOf(val) !== -1 ||
      index.nombre_empleado.toLowerCase().indexOf(val) !== -1 ||
      index.cantidad_instalaciones.toString().toLowerCase().indexOf(val) !== -1 ||
      !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
