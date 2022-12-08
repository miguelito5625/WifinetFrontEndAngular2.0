import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-listar-ajustes-boletas-deposito',
  templateUrl: './listar-ajustes-boletas-deposito.component.html',
  styleUrls: ['./listar-ajustes-boletas-deposito.component.css']
})
export class ListarAjustesBoletasDepositoComponent implements OnInit {

  
  @ViewChild('filtroTexto') filtroTexto: ElementRef;
  @ViewChild('filtroEstado') filtroEstado: ElementRef;

  numeroBoleta = '';
  estadoBoleta = '';

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
    private router: Router
  ) {

    console.log('Boleta de deposito seleccionada:');
    console.log(this.servicioBoletasDeposito.boletaDepositoSeleccionada);
    this.numeroBoleta = this.servicioBoletasDeposito.boletaDepositoSeleccionada.numero_boleta;
    this.estadoBoleta = this.servicioBoletasDeposito.boletaDepositoSeleccionada.estado;



  }

  ngOnInit(): void {
    this.cargarAjustesDeBoleta(this.servicioBoletasDeposito.boletaDepositoSeleccionada.id);
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  modificarAjuste(ajuste) {
    this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado = ajuste;
    this.router.navigate(['/administrador/ajustes-boletas-deposito/modificar']);
  }

  detalleAjuste(ajuste) {
    this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado = ajuste;
    this.router.navigate(['/administrador/ajustes-boletas-deposito/detalle']);
  }

  async anularAjuste(ajuste){

    const confirmacion = await Swal.fire({
      title: '¿Anular el ajuste?',
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

    const datos = {
      id_ajuste: ajuste.id_ajuste
    };

    this.servicioBoletasDeposito.anularAjusteDeBoleta(datos).subscribe(
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

        this.cargarAjustesDeBoleta(this.servicioBoletasDeposito.boletaDepositoSeleccionada.id);
        
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




  cargarAjustesDeBoleta(id_boleta_deposito) {

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

    const subcribeBoletasDeposito = this.servicioBoletasDeposito.obtenerAjustesDeBoleta(id_boleta_deposito).subscribe(
      res => {
        const result: any = res;

        for (var i in result.ajustes) {
          result.ajustes[i].fecha_sistema_formateada = moment(result.ajustes[i].fecha_sistema).locale('es').format('LL');
          result.ajustes[i].numero_boleta = this.servicioBoletasDeposito.boletaDepositoSeleccionada.numero_boleta;
          result.ajustes[i].nombre_banco = this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_banco;
          result.ajustes[i].monto_depositado = this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado;
          result.ajustes[i].estado_boleta = this.servicioBoletasDeposito.boletaDepositoSeleccionada.estado;
        }

        console.log('filas');
        console.log(result.ajustes);
        
        this.rows = result.ajustes;
        this.temp = [...this.rows];
        subcribeBoletasDeposito.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
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

    val1.map(element=> {
            
      temp = temp.filter(function (index) {
        return (index.numero_boleta.toLowerCase().indexOf(element) !== -1 ||
          index.estado.toLowerCase().indexOf(element) !== -1 ||
          index.nombre_banco.toLowerCase().indexOf(element) !== -1 ||
          index.monto_depositado.toLowerCase().indexOf(element) !== -1 ||
          index.monto.toLowerCase().indexOf(element) !== -1 ||
          index.tipo_ajuste.toLowerCase().indexOf(element) !== -1 ||
          index.fecha_sistema_formateada.toLowerCase().indexOf(element) !== -1 ||
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
