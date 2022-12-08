import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CobrosService } from 'src/app/servicios/cobros/cobros.service';
import { Router } from '@angular/router';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';
import { async } from 'rxjs/internal/scheduler/async';
import { ArchivosRecibosService } from 'src/app/servicios/archivos-recibos/archivos-recibos.service';

declare var $: any;
declare var Swal: any;
declare var moment: any;


@Component({
  selector: 'app-listar-cobros',
  templateUrl: './listar-cobros.component.html',
  styleUrls: ['./listar-cobros.component.css']
})
export class ListarCobrosComponent implements OnInit, AfterViewInit, OnDestroy {

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
    private servicioCobros: CobrosService,
    private servicioCostosTransacciones: CostoTransaccionesService,
    private router: Router,
    private servicioRecibos: ArchivosRecibosService
  ) {


  }

  ngOnInit() {
    this.cargarCobros();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  crearRecibo(cobro){
    if (!cobro.numero_recibo) {
      Swal.fire({
        title: 'El cobro de mensualidad no tiene numero de recibo',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
      });
      return;
    }
    this.servicioRecibos.crearReciboCobroMensualidad(cobro);
  }

  detalleCobro(cobro) {
    this.servicioCobros.cobroSeleccionado = cobro;
    this.router.navigate(['/administrador/cobros/detalles']);
  }

  modificarCobro(cobro) {
    this.servicioCobros.cobroSeleccionado = cobro;
    this.router.navigate(['/administrador/cobros/modificar']);
  }

  async cambiarEstado(cobro) {

    const mensajeReemplazar = await Swal.fire({
      icon: 'warning',
      title: '¿Esta seguro?',
      text: 'El cobro se anulara',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });

    if (!mensajeReemplazar.isConfirmed) {
      return;
    }

    Swal.fire({
      title: 'Anulando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const datos = {
      id_transaccion: cobro.id_transaccion,
      id_cobro_mensualidad: cobro.id_cobro_mensualidad
    };

    this.servicioCobros.anularCobro(datos).subscribe(
      res => {
        const result: any = res;
        console.log(result);
        this.cargarCobros();
        Swal.close();
      },
      err => {
        console.log(err);

      }
    )

  }

  cargarCobros() {

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

    const subcribeObtenerCobros = this.servicioCobros.obtenerCobros().subscribe(
      res => {
        const result: any = res;
        for (var i in result.cobros) {
          result.cobros[i].fecha_transaccion_usuario_formateada = moment(result.cobros[i].fecha_transaccion_usuario).locale('es').format('LL');
          result.cobros[i].fecha_transaccion_sistema_formateada = moment(result.cobros[i].fecha_transaccion_sistema).locale('es').format('LL');
        }
        console.log(result.cobros);
        this.obtenerDescuentoPorReferenciaVigente();
        this.rows = result.cobros;
        this.temp = [...this.rows];
        subcribeObtenerCobros.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
        }, 200);
        Swal.close();
      },
      async err => {
        console.log(err);
        subcribeObtenerCobros.unsubscribe();
        await Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/']);
      }
    );
  }

  obtenerDescuentoPorReferenciaVigente() {
    const susbcribeDescuento = this.servicioCostosTransacciones.obtenerDescuentoPorReferenciaVigente().subscribe(
      res => {
        const result: any = res;
        // console.log(result);
        this.servicioCostosTransacciones.descuentoPorReferenciaVigente = result.descuento.costo;
        // console.log('descuento por referencia vigente:', this.servicioCostosTransacciones.descuentoPorReferenciaVigente);
        susbcribeDescuento.unsubscribe();
      },
      async err => {
        console.log(err);
        susbcribeDescuento.unsubscribe();
        await Swal.fire({
          title: 'Error!',
          text: 'No se pudo obtener el descuento por referencia',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/']);
      }
    );

  }


  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element => {

      temp = temp.filter(function (index) {
        return (index.nombre_cliente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.nombre_plan.toLowerCase().indexOf(element) !== -1 ||
          index.direccion_instalacion.toLowerCase().indexOf(element) !== -1 ||
          index.fecha_transaccion_usuario_formateada.toLowerCase().indexOf(element) !== -1 ||
          index.mes_de_pago.toLowerCase().indexOf(element) !== -1 ||
          index.anio_de_pago.toString().toLowerCase().indexOf(element) !== -1 ||
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
