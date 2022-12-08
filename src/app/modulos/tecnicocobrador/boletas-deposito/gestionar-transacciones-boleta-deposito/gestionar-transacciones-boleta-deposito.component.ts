import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { TransaccionesService } from 'src/app/servicios/transacciones/transacciones.service';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-gestionar-transacciones-boleta-deposito',
  templateUrl: './gestionar-transacciones-boleta-deposito.component.html',
  styleUrls: ['./gestionar-transacciones-boleta-deposito.component.css']
})
export class GestionarTransaccionesBoletaDepositoComponent implements OnInit, OnDestroy {

  transaccionesSinBoleta = [];
  transaccionesDeBoleta = [];


  totalTransacciones: Number = 0;

  selected = [];
  // idsTransacciones = [];
  SelectionType = SelectionType;


  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(this.selected);

    // this.idsTransacciones = [];

    this.totalTransacciones = 0;
    this.selected.forEach(element => {
      this.totalTransacciones = Number(this.totalTransacciones) + Number(element.total_transaccion);
      // this.idsTransacciones.push(element.id_transaccion);
    });

    // console.log(this.idsTransacciones);


    this.formularioCuadre.controls.totalTransaccionesSeleccionadas.setValue(this.totalTransacciones.toFixed(2));
    const balance = Number(this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado) + Number(this.servicioBoletasDeposito.boletaDepositoSeleccionada.total_monto_ajustes) - Number(this.totalTransacciones);
    this.formularioCuadre.controls.balance.setValue(balance.toFixed(2));


  }


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

  formularioCuadre = new FormGroup({
    totalDepositado: new FormControl(0),
    totalTransaccionesSeleccionadas: new FormControl(0),
    balance: new FormControl(0)
  });

  constructor(
    private servicioBoletasDeposito: BoletaDepositoService,
    private servicioTransacciones: TransaccionesService,
    private router: Router
  ) {
    if (!this.servicioBoletasDeposito.boletaDepositoSeleccionada) {
      this.router.navigate(['/tecnicocobrador/boletas-deposito/listar']);
      return;
    }
    console.log(this.servicioBoletasDeposito.boletaDepositoSeleccionada);

    this.cargarTransaccionesConIdBoletaDeposito(this.servicioBoletasDeposito.boletaDepositoSeleccionada.id);

  }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  ngOnDestroy() {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = null;
  }

  llenarFormulario() {
    this.formularioCuadre.controls.totalDepositado.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado);
    this.formularioCuadre.controls.balance.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.balance);
  }

  guardarTransacciones() {

    // if (this.formularioCuadre.controls.balance.value > 0 || this.formularioCuadre.controls.balance.value < 0) {
    //   Swal.fire({
    //     title: 'No puede cerrar cuadre si el balance no esta a 0',
    //     icon: 'warning',
    //     showCloseButton: true,
    //     showCancelButton: false,
    //     confirmButtonText: 'Entendido',
    //   });
    //   return;
    // }

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

    const idsTransacciones = this.selected.map(element => {
      return element.id_transaccion;
    })

    const datos = {
      id_boleta_deposito: this.servicioBoletasDeposito.boletaDepositoSeleccionada.id,
      idsTransacciones: idsTransacciones
    }

    console.log(datos);


    this.servicioBoletasDeposito.gestionarTransacciones(datos).subscribe(
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

        this.router.navigate(['/tecnicocobrador/boletas-deposito/listar']);

      },
      async (err) => {
        console.log(err);

        await Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        
        this.rows = [];
        // this.transaccionesDeBoleta = [];
        // this.transaccionesSinBoleta = [];
        this.selected = [];
        this.cargarTransaccionesConIdBoletaDeposito(this.servicioBoletasDeposito.boletaDepositoSeleccionada.id);

      }
    )
  }

  cargarTransaccionesConIdBoletaDeposito(id_boleta_deposito) {

    const subcripcionTransaccionesBoleta = this.servicioTransacciones.obtenerTransaccionesPorIdBoleta(id_boleta_deposito).subscribe(
      res => {
        const result: any = res;


        for (var i in result.transacciones) {
          result.transacciones[i].fecha_transaccion_usuario_formateada = moment(result.transacciones[i].fecha_transaccion_usuario).locale('es').format('LL');
          result.transacciones[i].fecha_transaccion_sistema_formateada = moment(result.transacciones[i].fecha_transaccion_sistema).locale('es').format('LL');
        }

        console.log('transacciones de la boleta');
        console.log(result.transacciones);
        this.transaccionesDeBoleta = result.transacciones;

        this.cargarTransaccionesSinBoletaDeposito();

        subcripcionTransaccionesBoleta.unsubscribe();


        Swal.close();
      },
      err => {
        console.log(err);
        subcripcionTransaccionesBoleta.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

      }
    );


  }

  cargarTransaccionesSinBoletaDeposito() {

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

    const subcripcionTransacciones = this.servicioTransacciones.obtenerTransaccionesValidasSinBoletaDeposito().subscribe(
      res => {
        const result: any = res;


        for (var i in result.transacciones) {
          result.transacciones[i].fecha_transaccion_usuario_formateada = moment(result.transacciones[i].fecha_transaccion_usuario).locale('es').format('LL');
          result.transacciones[i].fecha_transaccion_sistema_formateada = moment(result.transacciones[i].fecha_transaccion_sistema).locale('es').format('LL');
        }

        console.log(result.transacciones);
        this.transaccionesSinBoleta = result.transacciones;
        subcripcionTransacciones.unsubscribe();

        this.rows = this.rows.concat(this.transaccionesDeBoleta, this.transaccionesSinBoleta);
        this.selected = this.selected.concat(this.transaccionesDeBoleta);
        this.temp = [...this.rows];

        this.totalTransacciones = 0;
        this.transaccionesDeBoleta.forEach(element => {
          this.totalTransacciones = Number(this.totalTransacciones) + Number(element.total_transaccion);
        });
        this.formularioCuadre.controls.totalTransaccionesSeleccionadas.setValue(this.totalTransacciones.toFixed(2));
        const balance = Number(this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado) + Number(this.servicioBoletasDeposito.boletaDepositoSeleccionada.total_monto_ajustes) - Number(this.totalTransacciones);
        this.formularioCuadre.controls.balance.setValue(balance.toFixed(2));

        Swal.close();
      },
      err => {
        console.log(err);
        subcripcionTransacciones.unsubscribe();
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
    const val1 = event.target.value.toLocaleLowerCase().split(' ');

    let temp = this.temp;

    val1.map(element=> {
            
      // filter our data
    temp = temp.filter(function (index) {
      const numero_factura = index.numero_factura ? index.numero_factura : '';
      return (index.nombre_cliente.toLowerCase().indexOf(element) !== -1 ||
        index.tipo_transaccion.toLowerCase().indexOf(element) !== -1 ||
        index.fecha_transaccion_usuario.toLowerCase().indexOf(element) !== -1 ||
        index.total_transaccion.toLowerCase().indexOf(element) !== -1 ||
        numero_factura.toLowerCase().indexOf(element) !== -1 ||
        !element);
    });

    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
