import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { Router } from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-seleccionar-cliente-cobro',
  templateUrl: './seleccionar-cliente-cobro.component.html',
  styleUrls: ['./seleccionar-cliente-cobro.component.css']
})
export class SeleccionarClienteCobroComponent implements OnInit, OnDestroy {

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


  listarDirecciones(cliente){
   this.servicioClientes.clienteSeleccionado = cliente;
   this.router.navigate(['/administrador/cobros/crear/seleccionar-instalacion-cobro']);    
  }


  ngOnInit() {
    this.cargarClientes();    
  }

  ngOnDestroy(){
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

    const subcribeObtenerClientes = this.servicioClientes.obtenerClientesPorEstado('Activo').subscribe(
      res => {
        const result: any = res;
        // console.log(result.clientes);

        this.rows = result.clientes;
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

    const val1 = event.target.value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');

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
        !element);
      });

    });


    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
