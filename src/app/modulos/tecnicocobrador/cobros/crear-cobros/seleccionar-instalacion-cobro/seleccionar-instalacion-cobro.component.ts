import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CobrosService } from 'src/app/servicios/cobros/cobros.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';

declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-seleccionar-instalacion-cobro',
  templateUrl: './seleccionar-instalacion-cobro.component.html',
  styleUrls: ['./seleccionar-instalacion-cobro.component.css']
})
export class SeleccionarInstalacionCobroComponent implements OnInit, OnDestroy {

  nombreCliente:string;

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
    private servicioInstalaciones: TransaccionesInstalacionesService,
    private servicioCobros: CobrosService,
    private servicioCostoTransacciones: CostoTransaccionesService,
    private router: Router
  ) { 

    if (!this.servicioClientes.clienteSeleccionado) {
      this.router.navigate(['/tecnicocobrador/cobros/listar']);
      return;
    }

    // console.log(this.servicioClientes.clienteSeleccionado);
    this.nombreCliente = this.servicioClientes.clienteSeleccionado.primer_nombre + ' ' +
                          this.servicioClientes.clienteSeleccionado.segundo_nombre + ' ' +
                          this.servicioClientes.clienteSeleccionado.primer_apellido + ' ' +
                          this.servicioClientes.clienteSeleccionado.segundo_apellido;
    

  }

  ngOnInit(): void {
    this.cargarIntalaciones();
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }


  async llenarDatosCobro(instalacion){    

    Swal.fire({
      title: 'Cargando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    this.servicioInstalaciones.instalacionSeleccionada = instalacion; 

    let datos = {
      id_instalacion: instalacion.id_instalacion
    };    

   let subcripcionPrimerPago = this.servicioCobros.comprobarPrimerPago(datos).subscribe(
      async (res) => {
        const result:any = res;
        // console.log(result);
        this.servicioCobros.primerPago = result.esPrimerPago;

        if (this.servicioCobros.primerPago === 'no') {
          this.servicioCobros.cantidadDePagos = result.cantidadDePagos
          this.servicioCobros.ultimoPago = result.ultimoPago;
        }

        let subcripcionPlanVigente =  this.servicioCostoTransacciones.obtenerCostoPlanVigente(instalacion.id_plan).subscribe(
          async (res) => {
            const result:any = res;
            // console.log('el precio del plan es:');
            this.servicioCobros.precioPlan = result.costo_plan.costo
            // console.log(this.servicioCobros.precioPlan);

           let subcripcionReferencias = this.servicioCobros.comprobarReferencias({id_cliente: this.servicioClientes.clienteSeleccionado.id_cliente}).subscribe(
              async (res)=>{
                let result:any = res;

                if (this.servicioCobros.primerPago === 'si') {
                  result.tieneReferencias = 'no';
                }

                console.log(result);
                

                this.servicioCobros.tieneReferencias = result.tieneReferencias;
                if (result.tieneReferencias === 'si') {
                  this.servicioCobros.id_ultima_referencia = result.id_ultima_referencia;
                  this.servicioCobros.cantidadReferencias = result.cantidad_referencias;
                  this.servicioCobros.nombre_cliente_referido = result.nombre_cliente_referido;
                }
                
                subcripcionPrimerPago.unsubscribe();
                subcripcionPlanVigente.unsubscribe();
                subcripcionReferencias.unsubscribe();
                Swal.close();
                this.router.navigate(['/tecnicocobrador/cobros/crear/llenar-datos-cobro']);

              },
              err =>{
                console.log(err);
                
              }
            )


          },
          err => {
            console.log(err);
            
          }
        )


        
      },
      err => {
        console.log(err);
        
      }
    )

  }

  cargarIntalaciones() {

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

    const id_cliente = this.servicioClientes.clienteSeleccionado.id_cliente;

    const subcribeObtenerClientes = this.servicioInstalaciones.obtenerInstalacionesPorClienteEstado('activa', id_cliente).subscribe(
      res => {
        const result: any = res;
        // console.log(result.instalaciones);

        this.rows = result.instalaciones;
        this.temp = [...this.rows];
        subcribeObtenerClientes.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerClientes.unsubscribe();
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
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (index) {
      return (index.nombre_cliente.toLowerCase().indexOf(val) !== -1 ||
        index.nombre_plan.toLowerCase().indexOf(val) !== -1 ||
        index.estado.toLowerCase().indexOf(val) !== -1 ||
        index.departamento.toLowerCase().indexOf(val) !== -1 ||
        index.municipio.toLowerCase().indexOf(val) !== -1 ||
        index.barrio.toLowerCase().indexOf(val) !== -1 ||
        index.especificacion_direccion.toLowerCase().indexOf(val) !== -1 ||
        index.ip_asignada.toLowerCase().indexOf(val) !== -1 ||
        !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
