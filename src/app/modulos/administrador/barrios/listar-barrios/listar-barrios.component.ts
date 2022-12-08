import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { async } from '@angular/core/testing';


declare var $: any;
declare var Swal: any;


@Component({
  selector: 'app-listar-barrios',
  templateUrl: './listar-barrios.component.html',
  styleUrls: ['./listar-barrios.component.css']
})
export class ListarBarriosComponent implements OnInit, OnDestroy {

  @ViewChild('filtroTexto') filtroTexto: ElementRef;


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
    private servicioDirecciones: DireccionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerBarrios();
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  modificarBarrio(barrio){
    this.servicioDirecciones.barrioSeleccionado = barrio;
    this.router.navigate(['/administrador/barrios/modificar']);
  }

  async eliminarBarrio(barrio){
    const id_barrio = barrio.id_barrio;
    console.log(id_barrio);
    

    const darDeBaja = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar?',
      // text: '',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });
  
    console.log(darDeBaja);

    if (darDeBaja.dismiss) {
      return;
    }

    Swal.fire({
      title: 'Procesando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });


    const subscribeEliminar = this.servicioDirecciones.eliminarBarrio(id_barrio).subscribe(
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
        this.obtenerBarrios();
        subscribeEliminar.unsubscribe();
      },
      async (err) => {
        console.log(err);
        
        if (err.code === 1451) {
          this.forzarEliminacion(err, id_barrio);
          subscribeEliminar.unsubscribe();
          return;
        }
        Swal.fire({
          title: 'Error al eliminar el barrio!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeEliminar.unsubscribe();
      }
    )
    

  }

  async forzarEliminacion(err, id_barrio){

    const mensaje = err.message;
    const advertencia = 'si lo elimina tambien eliminara los otros registros';
    const pregunta = '¿Eliminar de todos modos?'

    const eliminar = await Swal.fire({
      title: 'Error al eliminar el barrio!',
      html: `${err.message} <br> ${advertencia} <br> ${pregunta}`,
      icon: 'error',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });

    if (eliminar.dismiss) {
      return;
    }

    Swal.fire({
      title: 'Procesando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const subscribeEliminarForzoso = this.servicioDirecciones.eliminarForzosoBarrio(id_barrio).subscribe(
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
        this.obtenerBarrios();
        subscribeEliminarForzoso.unsubscribe();
      },
      async (err) => {
        console.log(err);
        Swal.fire({
          title: 'Error al eliminar el barrio!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeEliminarForzoso.unsubscribe();
      }
    );
    
  }

  obtenerBarrios() {
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
    const subcribeObtenerBarrios = this.servicioDirecciones.obtenerBarrios().subscribe(
      res => {
        const result: any = res;
        console.log(result.barrios);

        this.rows = result.barrios;
        this.temp = [...this.rows];
        subcribeObtenerBarrios.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);
        Swal.close();

      },
      err => {
        console.log(err);
        subcribeObtenerBarrios.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )
  }

  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');

    let temp = this.temp;

    val1.map(element => {

      temp = temp.filter(function (index) {
        return (index.nombre_barrio.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.nombre_municipio.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.nombre_departamento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          !element);
      });

    });


    // Actualiza las filas
    this.rows = temp;
    // Cuando se realiza un filtro la tabla regresa a la primera pagina
    this.table.offset = 0;

  }

}
