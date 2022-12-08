import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { VentasService } from 'src/app/servicios/ventas/ventas.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { ArchivosRecibosService } from 'src/app/servicios/archivos-recibos/archivos-recibos.service';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

declare var Swal: any;
declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit, AfterViewInit, OnDestroy {

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
    private servicioVentas: VentasService,
    private router: Router,
    private servicioRecibos: ArchivosRecibosService
  ) { }

  ngOnInit(): void {
    this.cargarVentas();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  
  crearRecibo(venta){
    if (!venta.numero_recibo) {
      Swal.fire({
        title: 'La venta no tiene numero de recibo',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
      });
      return;
    }
    this.servicioRecibos.crearReciboVentas(venta);
  }

  obtenerTotal(total, ajuste) {
    return (Number(total) + Number(ajuste)).toFixed(2);
  }

  detalleVenta(venta) {
    this.servicioVentas.ventaSeleccionada = venta;
    this.router.navigate(['/administrador/ventas/detalle']);
  }

  modificarVenta(venta) {
    this.servicioVentas.ventaSeleccionada = venta;
    this.router.navigate(['/administrador/ventas/modificar']);
  }

  async cambiarEstado(venta) {
    let estado_venta = venta.estado_venta;

    let mensaje = '';

    if (estado_venta === 'validada') {
      mensaje = 'anular';
      estado_venta = 'anulada';
    } else {
      mensaje = 'marcar como realizada';
      estado_venta = 'validada';
    }

    const cambiarEstado = await Swal.fire({
      icon: 'warning',
      title: `¿Desea anular la venta?`,
      text: 'ya no podra cambiar el estado ni editar esta venta',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });

    if (!cambiarEstado.isConfirmed) {
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

    let datos: any = {
      id_transaccion: venta.id_transaccion,
      estado: estado_venta
    };

    this.servicioVentas.cambiarEstadoVenta(datos).subscribe(
      async (res) => {
        const result: any = res;
        console.log(result);

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          confirmButtonText: 'Entendido',
        });

        this.cargarVentas();

      },
      err => {
        console.log(err);

        Swal.fire({
          icon: 'error',
          title: `Servidor no responde`,
          showCloseButton: true,
          confirmButtonText: 'Entendido',
        });

      }
    )


  }


  cargarVentas() {

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

    const subcribeObtenerVentas = this.servicioVentas.obtenerVentas().subscribe(
      res => {
        const result: any = res;
        console.log(result.ventas);

        for (var i in result.ventas) {
          result.ventas[i].fecha_transaccion_usuario_formateada = moment(result.ventas[i].fecha_transaccion_usuario).locale('es').format('LL');
          result.ventas[i].fecha_transaccion_sistema_formateada = moment(result.ventas[i].fecha_transaccion_sistema).locale('es').format('LL');
        }

        this.rows = result.ventas;
        this.temp = [...this.rows];
        subcribeObtenerVentas.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
          // $("div").tooltip();
        }, 200);
        Swal.close();

      },
      err => {
        console.log(err);
        subcribeObtenerVentas.unsubscribe();
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
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element => {

      temp = temp.filter(function (index) {
        return (index.nombre_cliente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.fecha_transaccion_sistema_formateada.toLowerCase().indexOf(element) !== -1 ||
          index.fecha_transaccion_usuario_formateada.toLowerCase().indexOf(element) !== -1 ||
          index.estado_venta.toLowerCase().indexOf(element) !== -1 ||
          index.total_venta.toLowerCase().indexOf(element) !== -1 ||
          index.ajuste.toLowerCase().indexOf(element) !== -1 ||
          index.total_transaccion.toLowerCase().indexOf(element) !== -1 ||
          !element);
      });

    });


    temp = temp.filter(function (index) {
      return (
        index.estado_venta.toLowerCase().indexOf(val2) !== -1 ||
        !val2
        );
    });

    // Actualiza las filas
    this.rows = temp;
    // Cuando se realiza un filtro la tabla regresa a la primera pagina
    this.table.offset = 0;

  }

}
