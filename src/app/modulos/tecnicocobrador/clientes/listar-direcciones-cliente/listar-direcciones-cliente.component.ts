import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';

declare var $:any;
declare var Swal:any;

@Component({
  selector: 'app-listar-direcciones-cliente',
  templateUrl: './listar-direcciones-cliente.component.html',
  styleUrls: ['./listar-direcciones-cliente.component.css']
})
export class ListarDireccionesClienteComponent implements OnInit, OnDestroy {

  clienteSeleccionado:any;
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
    private router: Router
  ) { 
    if (!this.servicioClientes.clienteSeleccionado) {
      router.navigate(['/tecnicocobrador/clientes/listar']);
      return;
    }
    this.clienteSeleccionado = this.servicioClientes.clienteSeleccionado;
    this.nombreCliente = this.clienteSeleccionado.primer_nombre + ' ' + this.clienteSeleccionado.segundo_nombre + ' ' + this.clienteSeleccionado.primer_apellido + ' ' + this.clienteSeleccionado.segundo_apellido;
  }

  ngOnInit() {
    console.log(this.clienteSeleccionado);
    
    this.cargarDirecciones();
  }

  ngOnDestroy(){
    $('.tooltip').remove();
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

  editarDireccion(direccion){
    this.servicioClientes.direccionSeleccionada = direccion;
    this.router.navigate(['/tecnicocobrador/clientes/modificar-direcciones']);
  }

}
