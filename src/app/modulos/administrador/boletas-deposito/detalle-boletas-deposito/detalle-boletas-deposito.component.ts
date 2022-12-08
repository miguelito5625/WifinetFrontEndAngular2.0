import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BoletasDepositoComponent } from '../boletas-deposito.component';
import { Router } from '@angular/router';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { async } from '@angular/core/testing';
import { TransaccionesService } from 'src/app/servicios/transacciones/transacciones.service';

declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-detalle-boletas-deposito',
  templateUrl: './detalle-boletas-deposito.component.html',
  styleUrls: ['./detalle-boletas-deposito.component.css']
})
export class DetalleBoletasDepositoComponent implements OnInit, OnDestroy {

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

  formularioBoleta = new FormGroup({
    numero_boleta: new FormControl(''),
    fecha_deposito: new FormControl(''),
    nombre_banco: new FormControl(''),
    monto_depositado: new FormControl(''),
    total_monto_transacciones: new FormControl(''),
    balance: new FormControl(''),
    estado: new FormControl(''),
    creadaPor: new FormControl('')
  });

  constructor(
    private servicioBoletasDeposito: BoletaDepositoService,
    private servicioTransacciones: TransaccionesService,
    private router: Router
  ) {
    if (!this.servicioBoletasDeposito.boletaDepositoSeleccionada) {
      this.router.navigate(['/administrador/boletas-deposito/listar']);
      return;
    }
    console.log(this.servicioBoletasDeposito.boletaDepositoSeleccionada);

  }

  ngOnInit(): void {
    this.llenarFormulario();
    this.cargarTransaccionesConBoletaDeposito();
  }

  ngOnDestroy() {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = null;
  }

  llenarFormulario() {
    this.formularioBoleta.controls.numero_boleta.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.numero_boleta);
    this.formularioBoleta.controls.fecha_deposito.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.fecha_deposito_formateado);
    this.formularioBoleta.controls.nombre_banco.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_banco);
    this.formularioBoleta.controls.monto_depositado.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado);
    this.formularioBoleta.controls.estado.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.estado);
    this.formularioBoleta.controls.balance.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.balance);
    this.formularioBoleta.controls.creadaPor.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_empleado);
  }

  cargarTransaccionesConBoletaDeposito() {

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

    const subcripcionTransacciones = this.servicioTransacciones.obtenerTransaccionesPorIdBoleta(this.servicioBoletasDeposito.boletaDepositoSeleccionada.id).subscribe(
      res => {
        const result: any = res;
        let total_monto_transacciones = 0;

        for (var i in result.transacciones) {
          result.transacciones[i].fecha_transaccion_usuario_formateada = moment(result.transacciones[i].fecha_transaccion_usuario).locale('es').format('LL');
          result.transacciones[i].fecha_transaccion_sistema_formateada = moment(result.transacciones[i].fecha_transaccion_sistema).locale('es').format('LL');
          total_monto_transacciones = Number(total_monto_transacciones) + Number(result.transacciones[i].total_transaccion);
        }

        // const balance = Number(this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado) - Number(total_monto_transacciones);

        this.formularioBoleta.controls.total_monto_transacciones.setValue(total_monto_transacciones.toFixed(2));
        // this.formularioBoleta.controls.balance.setValue(balance.toFixed(2));

        console.log(result.transacciones);

        this.rows = result.transacciones;
        this.temp = [...this.rows];
        subcripcionTransacciones.unsubscribe();

        Swal.close();
      },
      async (err) => {
        console.log(err);
        subcripcionTransacciones.unsubscribe();
        await Swal.fire({
          title: 'Error!',
          text: 'No cargaron correctamente los detalles del deposito, servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/administrador/boletas-deposito/listar']);

      }
    )

  }

}
