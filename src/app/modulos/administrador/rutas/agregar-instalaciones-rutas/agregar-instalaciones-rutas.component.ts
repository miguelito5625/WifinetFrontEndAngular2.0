import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

declare var Swal:any;


@Component({
  selector: 'app-agregar-instalaciones-rutas',
  templateUrl: './agregar-instalaciones-rutas.component.html',
  styleUrls: ['./agregar-instalaciones-rutas.component.css']
})
export class AgregarInstalacionesRutasComponent implements OnInit {

   // comienza la logica de la tabla
   messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  selected = [];

  rows = [];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  // Termina la logica de la tabla

  formularioRuta = new FormGroup({
    nombre_ruta: new FormControl(''),
    nombre_empleado: new FormControl('')
  });

  constructor(
    private servicioRutas: RutasService,
    private servicioInstalaciones: TransaccionesInstalacionesService,
    private router: Router
  ) {
    if (!this.servicioRutas.rutaSeleccionada) {
      this.router.navigate(['/administrador/rutas/listar']);
      return;
    }
    console.log(this.servicioRutas.rutaSeleccionada);
    
   }


  ngOnInit(): void {
    this.llenarFormulario();
    this.obtenerInstalacionesActivasSinRuta();
  }

  ngOnDestroy(){
    this.servicioRutas.rutaSeleccionada = null;
  }

  onSubmit(){

    Swal.fire({
      title: 'Procesando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const id_instalaciones = this.selected.map(element => {
      return element.id_instalacion;
    });

    const datos = {
      id_ruta: this.servicioRutas.rutaSeleccionada.id_ruta,
      id_instalaciones: id_instalaciones
    };

    const subscribeQuitarInstalaciones = this.servicioRutas.agregarInstalacionesDeRuta(datos).subscribe(
      async res => {
        const result:any = res;
        console.log(result);

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        
        subscribeQuitarInstalaciones.unsubscribe();

        this.router.navigate(['/administrador/rutas/listar']);
        
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeQuitarInstalaciones.unsubscribe();
      }
    );
    

  }


  llenarFormulario(){
    this.formularioRuta.patchValue({
      nombre_ruta: this.servicioRutas.rutaSeleccionada.nombre_ruta,
      nombre_empleado: this.servicioRutas.rutaSeleccionada.nombre_empleado
    })
  }


  obtenerInstalacionesActivasSinRuta() {

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

    const subcribeObtenerInstalaciones = this.servicioInstalaciones.obtenerInstalacionesActivasSinRuta().subscribe(
      res => {
        const result: any = res;
        // console.log(result.instalaciones);

        this.rows = result.instalaciones;
        this.temp = [...this.rows];
        subcribeObtenerInstalaciones.unsubscribe();

        
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerInstalaciones.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );

  }



  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    console.log(this.selected);
    
  }



  //Metodo para filtrar las instalaciones
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

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
