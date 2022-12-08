import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit, AfterViewInit, OnDestroy {

  
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
    private servicioClientes: ClientesService,
    private router: Router
  ) {


  }

  editarCliente(cliente) {
    this.servicioClientes.clienteSeleccionado = cliente;
    this.router.navigate(['/tecnicocobrador/clientes/modificar']);
  }

  agregarDireccion(cliente) {
    this.servicioClientes.clienteSeleccionado = cliente;
    this.router.navigate(['/tecnicocobrador/clientes/agregar-direccion']);
  }

  listarDirecciones(cliente) {
    this.servicioClientes.clienteSeleccionado = cliente;
    this.router.navigate(['/tecnicocobrador/clientes/listar-direcciones']);
  }

  detalleCliente(cliente) {
    this.servicioClientes.clienteSeleccionado = cliente;
    this.router.navigate(['/tecnicocobrador/clientes/detalle']);
  }

  ngOnInit() {
    this.cargarClientes();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  cargarClientes() {

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

    const subcribeObtenerClientes = this.servicioClientes.obtenerClientes().subscribe(
      res => {
        const result: any = res;
        console.log(result.clientes);

        this.rows = result.clientes;
        this.temp = [...this.rows];
        subcribeObtenerClientes.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
              // $('.selectpicker').tooltip('hide');
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


  getCellClass({ row, column, value }): any {
    // console.log(value);

    return {
      'ngx-datatable-estado-Inactivo': value === 'Inactivo',
      'ngx-datatable-estado-Activo': value === 'Activo'
    };
  }


  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element=> {
            
      temp = temp.filter(function (index) {
        return (index.cui.toLowerCase().indexOf(element) !== -1 ||
        index.primer_nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.segundo_nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.primer_apellido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.segundo_apellido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.telefono.toLowerCase().indexOf(element) !== -1 ||
        index.correo_electronico.toLowerCase().indexOf(element) !== -1 ||
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
