import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { async } from '@angular/core/testing';
import { MapsAPILoader } from '@agm/core';
import { element } from 'protractor';


declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-crear-rutas',
  templateUrl: './crear-rutas.component.html',
  styleUrls: ['./crear-rutas.component.css']
})
export class CrearRutasComponent implements OnInit {

  //Comienza logica de mapa

  public latitude: number;
  public longitude: number;
  public zoom: number;
  private geoCoder;


  public waypoints: Array<any> = [];
  public origin: any;
  public destination: any;
  mostrarRuta: boolean = false;

  inicializarMapas() {
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;

    });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.zoom = 12;
      });
    }
  }

  //Termina logica de mapa


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

  listaEmpleados: any = [];

  formularioRuta = new FormGroup({
    id_usuario_cobrador: new FormControl('', [Validators.required]),
    nombre_ruta: new FormControl('', [Validators.required])
  })

  constructor(
    private servicioEmpleados: EmpleadosService,
    private servicioTransaccionesInstalaciones: TransaccionesInstalacionesService,
    private servicioRutas: RutasService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader
  ) {
    this.inicializarMapas();
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    // this.obtenerInstalaciones();
  }

  onSubmit() {

    if (!this.formularioRuta.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Hay campos incorrectos',
        text: 'Por favor llene cada campo correctamente',
        showCloseButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Entedido',
      });
      return;
    }

    Swal.fire({
      title: 'Creando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });


    const instalaciones = this.selected.map(element => {
      return {
        id_instalacion: element.id_instalacion,
        orden_en_ruta: element.ordenEnRuta
      };
    });

    const datos = {
      nombre_ruta: this.formularioRuta.controls.nombre_ruta.value,
      id_usuario: this.formularioRuta.controls.id_usuario_cobrador.value,
      instalaciones
    }

    const subscribeCrearRuta = this.servicioRutas.crearRuta(datos).subscribe(
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

        subscribeCrearRuta.unsubscribe();

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
        subscribeCrearRuta.unsubscribe();
      }
    );


  }

  obtenerEmpleados() {

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

    const subcribeEmpleados = this.servicioEmpleados.obtenerEmpleadosEmpleadosConUsuario().subscribe(
      res => {
        const result: any = res;
        this.listaEmpleados = result.empleados;
        // console.log(this.listaEmpleados);

        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 200);
        subcribeEmpleados.unsubscribe();
        this.obtenerInstalaciones();
      },
      err => {
        console.log(err);
        subcribeEmpleados.unsubscribe();
      }
    )
  }


  obtenerInstalaciones() {

    const subcribeObtenerClientes = this.servicioTransaccionesInstalaciones.obtenerInstalacionesActivasSinRuta().subscribe(
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

  public renderOptions = {
    suppressMarkers: true,
  }




  onSelect({ selected }) {
    // this.selected.splice(0, this.selected.length);

    // this.selected.push(...selected);
    let ordenEnRuta = 0;

    this.selected = selected.map(
      element => {
        ordenEnRuta++;
        element.ordenEnRuta = ordenEnRuta;
        return element;
      }
    );

    this.waypoints = [];

    this.selected.forEach((element, index) => {

      if (index === 0) {
        this.origin = {
          lat: Number(element.latitud),
          lng: Number(element.longitud)
        };
        return;
      }

      if (index === this.selected.length - 1) {
        this.destination = {
          lat: Number(element.latitud),
          lng: Number(element.longitud)
        };
        return;
      }

      this.waypoints.push(
        { location: { lat: Number(element.latitud), lng: Number(element.longitud) } }
      );

    });

    if (this.selected.length < 2) {
      this.mostrarRuta = false;
    } else {
      this.mostrarRuta = true;
    }


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
