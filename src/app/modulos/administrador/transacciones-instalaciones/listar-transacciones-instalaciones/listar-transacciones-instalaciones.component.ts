import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { element } from 'protractor';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';
import { ArchivosRecibosService } from 'src/app/servicios/archivos-recibos/archivos-recibos.service';


declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-listar-transacciones-instalaciones',
  templateUrl: './listar-transacciones-instalaciones.component.html',
  styleUrls: ['./listar-transacciones-instalaciones.component.css']
})
export class ListarTransaccionesInstalacionesComponent implements OnInit, AfterViewInit, OnDestroy {

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
    private servicioTransaccionesInstalaciones: TransaccionesInstalacionesService,
    private servicioClientes: ClientesService,
    private servicioCostroTransacciones: CostoTransaccionesService,
    private router: Router,
    private servicioRecibos: ArchivosRecibosService
  ) {

    this.servicioTransaccionesInstalaciones.instalacionReferida = false;
    this.servicioTransaccionesInstalaciones.clienteQueRefirio = null;
    this.servicioClientes.clienteSeleccionado = null;

  }

  ngOnInit(): void {
    this.cargarIntalaciones();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  crearRecibo(instalacion){
    if (!instalacion.numero_recibo) {
      Swal.fire({
        title: 'La instalaci??n no tiene numero de recibo',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: 'Entendido',
      });
      return;
    }
    this.servicioRecibos.crearReciboInstalacion(instalacion);
  }

  verificarExisteCostoTransaccionParaInstalacion(){
    const subcribeVerificar = this.servicioCostroTransacciones.verificarExiscoCostoTransaccionParaInstalacion().subscribe(
      res => {
        const result:any = res;
        // console.log(result);
        subcribeVerificar.unsubscribe();
        if (result.existe === 'si') {
          this.crearInstalacion();
        } else {
          Swal.fire({
            title: 'Error!',
            text: result.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )
  }

  async crearInstalacion() {


    this.servicioTransaccionesInstalaciones.instalacionReferida = false;
    this.servicioTransaccionesInstalaciones.clienteQueRefirio = null;
    this.servicioClientes.clienteSeleccionado = null;

    const esReferida = await Swal.fire({
      icon: 'question',
      title: '??La instalacion fue referida?',
      // text: 'Por favor llene cada campo correctamente',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });
    

    if (esReferida.dismiss && esReferida.dismiss !== 'cancel') {
    return;
    }

    if (esReferida.isConfirmed) {
      // console.log('Seleccionar cliente referido');
      this.servicioTransaccionesInstalaciones.instalacionReferida = true;
      this.router.navigate(['/administrador/transacciones-instalaciones/crear/seleccionar-cliente-refirio']);
      return;
    } else {
      // console.log('Instalacion sin referencia');
      this.servicioTransaccionesInstalaciones.instalacionReferida = false;
      this.router.navigate(['/administrador/transacciones-instalaciones/crear/seleccionar-cliente-instalacion']);
      return;
    }

  }

  modificarInstalacion(instalacion) {
    this.servicioTransaccionesInstalaciones.instalacionSeleccionada = instalacion;
    this.router.navigate(['/administrador/transacciones-instalaciones/modificar']);
  }

  detallesInstalacion(instalacion) {
    this.servicioTransaccionesInstalaciones.instalacionSeleccionada = instalacion;
    this.router.navigate(['/administrador/transacciones-instalaciones/detalles']);
  }

  async darDeBaja(instalacion) {

    const darDeBaja = await Swal.fire({
      icon: 'info',
      title: '??Dar de baja la instalaci??n?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });

    if (!darDeBaja.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Operacion cancelada',
        showCloseButton: true,
        confirmButtonText: 'Entendido!',
      });
      return;
    }

    Swal.fire({
      title: 'Realizando operacion',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const datos = {
      id_instalacion: instalacion.id_instalacion,
      id_transaccion: instalacion.id_transaccion,
      estado: 'inactiva',
      fecha_baja: moment().format("YYYY-MM-DD")
    };

    this.servicioTransaccionesInstalaciones.darDeBaja(datos).subscribe(
      async (res) => {
        const result: any = res;
        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          confirmButtonText: 'Entendido!',
        });
        this.cargarIntalaciones();
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

    const subcribeObtenerClientes = this.servicioTransaccionesInstalaciones.obtenerInstalaciones().subscribe(
      res => {
        const result: any = res;
        console.log(result.instalaciones);

        for (let i = 0; i < result.instalaciones.length; i++) {          
          result.instalaciones[i].fecha_alta_formateada = moment(result.instalaciones[i].fecha_alta).locale('es').format('LL');
        }

        this.rows = result.instalaciones;
        this.temp = [...this.rows];
        subcribeObtenerClientes.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
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


  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element=> {
            
      temp = temp.filter(function (index) {
        return (index.nombre_cliente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.nombre_plan.toLowerCase().indexOf(element) !== -1 ||
          index.estado.toLowerCase().indexOf(element) !== -1 ||
          index.departamento.toLowerCase().indexOf(element) !== -1 ||
          index.municipio.toLowerCase().indexOf(element) !== -1 ||
          index.barrio.toLowerCase().indexOf(element) !== -1 ||
          index.especificacion_direccion.toLowerCase().indexOf(element) !== -1 ||
          index.fecha_alta_formateada.toLowerCase().indexOf(element) !== -1 ||
          // index.ip_asignada.toLowerCase().indexOf(element) !== -1 ||
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
