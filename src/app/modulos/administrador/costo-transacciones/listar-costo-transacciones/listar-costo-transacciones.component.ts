import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';

declare var $: any;
declare var moment: any;
declare var Swal: any;


@Component({
  selector: 'app-listar-costo-transacciones',
  templateUrl: './listar-costo-transacciones.component.html',
  styleUrls: ['./listar-costo-transacciones.component.css']
})
export class ListarCostoTransaccionesComponent implements OnInit, AfterViewInit {

  @ViewChild('filtroTexto') filtroTexto: ElementRef;
  @ViewChild('filtroEstado') filtroEstado: ElementRef;


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
    private servicioCostoTransacciones: CostoTransaccionesService,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.cargarCostosTransacciones();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy(){
    $('.tooltip').remove();
  }

  detallesCostoTransacciones(costoTransacciones){
    this.servicioCostoTransacciones.costoTransaccionSeleccionado = costoTransacciones;
    this.router.navigate(['/administrador/costo-transacciones/detalle']);
  }


 async darDeBajaCostoTransacciones(tipo_transaccion, nombre_plan?){

  let darDeBaja;

  // if (tipo_transaccion === "Instalación") {

  //    darDeBaja = await Swal.fire({
  //     icon: 'warning',
  //     title: '¿Dar de baja?',
  //     text: `El actual registro sustituirá el costo de la ${tipo_transaccion} `,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Si',
  //     cancelButtonText: 'No'
  //   });
    
  // } else {

  //   darDeBaja = await Swal.fire({
  //     icon: 'warning',
  //     title: '¿Dar de baja?',
  //     text: `El actual registro sustituirá el costo de la ${tipo_transaccion} del plan de ${nombre_plan} `,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: 'Si',
  //     cancelButtonText: 'No'
  //   });
    
  // }

  darDeBaja = await Swal.fire({
    icon: 'warning',
    title: '¿Desea continuar?',
    text: 'Previo a dar de baja, debe de crear un nuevo costo para este tipo de transaccion',
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  });

  if (darDeBaja.isConfirmed) {
    this.router.navigate(['/administrador/costo-transacciones/crear']);
    return;
  }


 }


  formatearFecha(fecha){

    if (fecha) {
      return moment(fecha).locale('es').format('LL');
    }
    return null;
  }

  cargarCostosTransacciones() {

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

    const subcribeObtenerCostoTransacciones = this.servicioCostoTransacciones.obtenerCostoTransacciones().subscribe(
      res => {
        const result: any = res;
        console.log(result.costo_transacciones);

        this.rows = result.costo_transacciones;
        this.temp = [...this.rows];
        subcribeObtenerCostoTransacciones.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerCostoTransacciones.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().split(' ');
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element=> {
            
      temp = temp.filter(function (index) {
        const nombre_plan = index.nombre_plan ? index.nombre_plan.toString() : '';
        return (index.tipo_transaccion.toLowerCase().indexOf(element) !== -1 ||
          nombre_plan.toLowerCase().indexOf(element) !== -1 ||
          index.estado.toLowerCase().indexOf(element) !== -1 ||
          index.costo.toLowerCase().indexOf(element) !== -1 ||
          index.costo.toLowerCase().indexOf(element) !== -1 ||
          !element);
      });

    });


    temp = temp.filter(function (index) {
      return (
        index.estado.toLowerCase().indexOf(val2) !== -1 ||
        !val2);
    });

    // Actualiza las filas
    this.rows = temp;
    // Cuando se realiza un filtro la tabla regresa a la primera pagina
    this.table.offset = 0;
    
  }

}
