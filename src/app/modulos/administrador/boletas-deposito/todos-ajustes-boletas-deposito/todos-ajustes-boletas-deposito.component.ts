import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-todos-ajustes-boletas-deposito',
  templateUrl: './todos-ajustes-boletas-deposito.component.html',
  styleUrls: ['./todos-ajustes-boletas-deposito.component.css']
})
export class TodosAjustesBoletasDepositoComponent implements OnInit {

  
  @ViewChild('filtroTexto') filtroTexto: ElementRef;
  @ViewChild('filtroEstado') filtroEstado: ElementRef;

  numeroBoleta = '';

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

  }

  ngOnInit(): void {
    this.cargarAjustesDeBoleta();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  detalleAjuste(ajuste) {
    this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado = ajuste;
    this.router.navigate(['/administrador/boletas-deposito/detalle-ajuste']);
  }

  
  
  cargarAjustesDeBoleta() {

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

    const subcribeBoletasDeposito = this.servicioBoletasDeposito.todosLosAjustesDeBoletas().subscribe(
      res => {
        const result: any = res;

        for (var i in result.ajustes) {
          result.ajustes[i].fecha_sistema_formateada = moment(result.ajustes[i].fecha_sistema).locale('es').format('LL');
        }

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
