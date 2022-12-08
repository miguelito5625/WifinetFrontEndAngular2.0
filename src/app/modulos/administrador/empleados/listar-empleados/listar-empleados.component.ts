import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

declare var $: any;
declare var Swal: any;
declare var moment: any;
// import * as moment from 'moment';



@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('filtroTexto') filtroTexto: ElementRef;
  @ViewChild('filtroEstado') filtroEstado: ElementRef;

  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  rows = [
    // {
    //   id: 1,
    //   cui: '2451514781804',
    //   nombre: 'Miguel Angel Archila Garcia',
    //   telefono: '55801894',
    //   puesto: 'Administrador',
    //   estado: 'Activo'
    // }
  ];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;

  constructor(
    private servicioEmpleados: EmpleadosService,
    private router: Router
  ) {


  }

  editarEmpleado(empleado){
    this.servicioEmpleados.empleadoAModificar = empleado;
    this.router.navigate(['/administrador/empleados/modificar']);
  }

  detalleEmpleado(empleado){
    this.servicioEmpleados.empleadoAModificar = empleado;
    this.router.navigate(['/administrador/empleados/detalle']);
  }

  async reactivarEmpleado(empleado) {

    const darDeBaja = await Swal.fire({
      icon: 'info',
      title: '¿Reactivar empleado?',
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
      id_persona: empleado.id_persona,
      id_empleado: empleado.id_empleado,
      estado: 'Activo'
    };

    this.servicioEmpleados.reactivarEmpleado(datos).subscribe(
      async (res) => {
        const result: any = res;
       await Swal.fire({
          icon: 'success',
          title: 'El empleado ha sido reactivado',
          showCloseButton: true,
          confirmButtonText: 'Entendido!',
        });
        this.cargarEmpleados();
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Error al intentar reactivar el empleado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

      }
    )


  }

  async darDeBaja(empleado) {

    const darDeBaja = await Swal.fire({
      icon: 'info',
      title: '¿Dar de baja al empleado?',
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
      id_persona: empleado.id_persona,
      id_empleado: empleado.id_empleado,
      estado: 'Inactivo',
      fecha_baja: moment().format("YYYY-MM-DD")
    };

    this.servicioEmpleados.darDeBaja(datos).subscribe(
      async (res) => {
        const result: any = res;
       await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          confirmButtonText: 'Entendido!',
        });
        this.cargarEmpleados();
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

  crearUsuario(empleado){
    this.servicioEmpleados.empleadoAModificar = empleado;
    this.router.navigate(['/administrador/empleados/crear-usuario']);
  }

  modificarUsuario(empleado){
    this.servicioEmpleados.empleadoAModificar = empleado;
    this.router.navigate(['/administrador/empleados/editar-usuario']);
  }


  ngOnInit() {
    this.cargarEmpleados();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy(){
    $('.tooltip').remove();
  }

  cargarEmpleados() {

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

    const subcribeObtenerEmpleados = this.servicioEmpleados.obtenerEmpleados().subscribe(
      res => {
        const result: any = res;
        console.log(result.empleados);

        this.rows = result.empleados;
        this.temp = [...this.rows];
        subcribeObtenerEmpleados.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn-primary").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerEmpleados.unsubscribe();
        Swal.fire({
          title: 'Error!',
          // text: err,
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
        return (index.cui.toLowerCase().indexOf(element) !== -1 ||
        index.primer_nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.segundo_nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.primer_apellido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.segundo_apellido.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
        index.telefono.toLowerCase().indexOf(element) !== -1 ||
        index.puesto.toLowerCase().indexOf(element) !== -1 ||
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
