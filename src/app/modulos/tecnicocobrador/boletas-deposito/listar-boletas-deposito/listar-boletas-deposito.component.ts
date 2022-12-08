import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { async } from '@angular/core/testing';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-listar-boletas-deposito',
  templateUrl: './listar-boletas-deposito.component.html',
  styleUrls: ['./listar-boletas-deposito.component.css']
})
export class ListarBoletasDepositoComponent implements OnInit, AfterViewInit, OnDestroy {

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
    private servicioBoletasDeposito: BoletaDepositoService,
    private router: Router,
    private servicioAutenticacion: AutenticacionService
  ) {


  }

  ngOnInit(): void {
    this.cargarBoletasDeposito();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
    $('#selectFiltroEstado').selectpicker('val', 'cuadrado');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  modificarBoleta(boleta) {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = boleta;
    this.router.navigate(['/tecnicocobrador/boletas-deposito/modificar']);
  }

  gestionarTransacciones(boleta) {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = boleta;
    this.router.navigate(['/tecnicocobrador/boletas-deposito/gestionar-transacciones-boleta']);
  }

  detalleBoleta(boleta) {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = boleta;
    this.router.navigate(['/tecnicocobrador/boletas-deposito/detalle']);
  }

  ajustesDeBoleta(boleta) {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = boleta;
    this.router.navigate(['/tecnicocobrador/ajustes-boletas-deposito/listar']);
  }

  async cuadrarBoletaDeposito(boleta) {
    const balance = Number(boleta.balance);
    console.log(`balance: ${balance}`);


    if (balance !== 0) {
      Swal.fire({
        title: 'No puede cerrar cuadre si el balance no esta a 0',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
      });
      return;
    }

    const confirmacion = await Swal.fire({
      title: '¿Cerrar cuadre?',
      icon: 'info',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });

    if (confirmacion.dismiss) {
      console.log('se cancelo');
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

    console.log(boleta);

    const datos = {
      id_boleta_deposito: boleta.id
    };

    this.servicioBoletasDeposito.cerrarCuadre(datos).subscribe(
      async (res) => {
        const result: any = res;
        console.log(result);

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        this.cargarBoletasDeposito();

      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )



  }



  cargarBoletasDeposito() {

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

    const id_usuario = this.servicioAutenticacion.usuarioLogueado.id_usuario;

    const subcribeBoletasDeposito = this.servicioBoletasDeposito.obtenerBoletasDepositoFiltradasPorUsuarioCreador(id_usuario).subscribe(
      res => {
        const result: any = res;

        for (var i in result.boletas_deposito) {
          result.boletas_deposito[i].fecha_deposito_formateado = moment(result.boletas_deposito[i].fecha_deposito).locale('es').format('LL');
          result.boletas_deposito[i].fecha_registro_formateado = moment(result.boletas_deposito[i].fecha_registro).locale('es').format('LL');
        }

        console.log(result.boletas_deposito);

        this.rows = result.boletas_deposito;
        this.temp = [...this.rows];
        subcribeBoletasDeposito.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
          // this.filtrarDatos();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeBoletasDeposito.unsubscribe();
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
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().split(' ');
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element => {

      temp = temp.filter(function (index) {
        return (index.numero_boleta.toLowerCase().indexOf(element) !== -1 ||
          index.fecha_deposito_formateado.toLowerCase().indexOf(element) !== -1 ||
          index.monto_depositado.toLowerCase().indexOf(element) !== -1 ||
          index.nombre_banco.toLowerCase().indexOf(element) !== -1 ||
          index.estado.toLowerCase().indexOf(element) !== -1 ||
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
