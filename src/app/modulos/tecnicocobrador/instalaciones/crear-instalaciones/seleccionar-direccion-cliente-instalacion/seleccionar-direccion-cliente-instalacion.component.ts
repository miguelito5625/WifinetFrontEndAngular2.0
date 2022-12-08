import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { Router } from '@angular/router';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-seleccionar-direccion-cliente-instalacion',
  templateUrl: './seleccionar-direccion-cliente-instalacion.component.html',
  styleUrls: ['./seleccionar-direccion-cliente-instalacion.component.css']
})
export class SeleccionarDireccionClienteInstalacionComponent implements OnInit, OnDestroy {

  clienteSeleccionado: any;
  nombreCliente: string;

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
    private servicioClientes: ClientesService,
    private servicioTransaccionesInstalaciones: TransaccionesInstalacionesService,
    private servicioDirecciones: DireccionesService,
    private router: Router
  ) {
    if (!this.servicioClientes.clienteSeleccionado) {
      router.navigate(['/tecnicocobrador/instalaciones/listar']);
      return;
    }
    this.clienteSeleccionado = this.servicioClientes.clienteSeleccionado;
    this.nombreCliente = this.clienteSeleccionado.primer_nombre + ' ' + this.clienteSeleccionado.segundo_nombre + ' ' + this.clienteSeleccionado.primer_apellido + ' ' + this.clienteSeleccionado.segundo_apellido;
  }

  ngOnInit() {
    console.log(this.clienteSeleccionado);

    this.cargarDirecciones();
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  async llenarDatosDeInstalacion(direccion) {
    console.log(direccion);
    this.servicioDirecciones.direccionSeleccionada = direccion;
    let datos: any = this.servicioTransaccionesInstalaciones.instalacionSeleccionada;
    datos.id_direccion = direccion.id_direccion;
    this.servicioTransaccionesInstalaciones.instalacionSeleccionada = datos;

    Swal.fire({
      title: 'Comprobando cantidad de instalaciones',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

   const subcripcionComprobarCantidadInstalacionesDeDireccion = this.servicioDirecciones.comprobarCantidadInstalacionesDeDireccion({ id_direccion: direccion.id_direccion }).subscribe(
      async (res) => {
        const result: any = res;
        console.log(result);

        const crearInstalacion = await Swal.fire({
          icon: 'info',
          title: '¿Desea agregar una instalación a esta dirección?',
          text: `La dirección seleccionada tiene ${result.total_instalaciones} instalaciones activas`,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        });


        if (crearInstalacion.isConfirmed) {
          this.servicioTransaccionesInstalaciones.instalacionSeleccionada.total_instalaciones = result.total_instalaciones;
          subcripcionComprobarCantidadInstalacionesDeDireccion.unsubscribe();
          this.router.navigate(['/tecnicocobrador/instalaciones/crear/llenar-datos-instalacion']);
          return;
        } else {
          subcripcionComprobarCantidadInstalacionesDeDireccion.unsubscribe();
          return;
        }

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

  cargarDirecciones() {

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

    const subcribeObtenerDirecciones = this.servicioClientes.obtenerDirecciones(this.clienteSeleccionado.id_persona).subscribe(
      res => {
        const result: any = res;
        console.log(result.direcciones);

        this.rows = result.direcciones;
        this.temp = [...this.rows];
        subcribeObtenerDirecciones.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerDirecciones.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

}
