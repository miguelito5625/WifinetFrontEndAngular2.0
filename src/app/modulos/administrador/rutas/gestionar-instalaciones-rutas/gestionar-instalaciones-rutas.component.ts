import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { FormGroup, FormControl } from '@angular/forms';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { async } from '@angular/core/testing';
import { MapsAPILoader } from '@agm/core';

declare var Swal: any;


@Component({
  selector: 'app-gestionar-instalaciones-rutas',
  templateUrl: './gestionar-instalaciones-rutas.component.html',
  styleUrls: ['./gestionar-instalaciones-rutas.component.css']
})
export class GestionarInstalacionesRutasComponent implements OnInit, OnDestroy, AfterViewInit {

  //Comienza logica de mapa
  public latitude: number;
  public longitude: number;
  public zoom: number;
  private geoCoder;


  public waypoints: Array<any> = [];
  public origin: any;
  public destination: any;

  mostrarRuta: boolean = false;

  // comienza la logica de la tabla
  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  selected = [];

  instalacionesDeRuta = [];
  instalacionesSinRuta = [];

  rows = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  // Termina la logica de la tabla

  nombreRuta;

  formularioRuta = new FormGroup({
    nombre_ruta: new FormControl(''),
    nombre_empleado: new FormControl('')
  });

  constructor(
    private servicioRutas: RutasService,
    private servicioInstalaciones: TransaccionesInstalacionesService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader
  ) {
    if (!this.servicioRutas.rutaSeleccionada) {
      this.router.navigate(['/administrador/rutas/listar']);
      return;
    }
    // console.log(this.servicioRutas.rutaSeleccionada);
    this.nombreRuta = this.servicioRutas.rutaSeleccionada.nombre_ruta;
    this.inicializarMapas();
    this.obtenerInstalacionesPorIdRuta(this.servicioRutas.rutaSeleccionada.id_ruta);

  }

  ngOnInit(): void {
    this.llenarFormulario();

  }

  ngAfterViewInit() {


  }

  ngOnDestroy() {
    this.servicioRutas.rutaSeleccionada = null;
  }

  async onSubmit() {

    const instalaciones = this.selected.map(element => {
      return {
        id_instalacion: element.id_instalacion,
        orden_en_ruta: element.orden_en_ruta
      };
    });

    const datos = {
      id_ruta: this.servicioRutas.rutaSeleccionada.id_ruta,
      instalaciones: instalaciones
    };

    // console.log(datos);

   const subscribeGestionarRuta = this.servicioRutas.gestionarInstalacionesDeRuta(datos).subscribe(
      async (res) => {
        const result:any = res;
        console.log(result);

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        subscribeGestionarRuta.unsubscribe();
        this.router.navigate(['/administrador/rutas/listar']);
        
      },
      err => {
        // console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

        subscribeGestionarRuta.unsubscribe();
        
      }
    )


  }

  llenarFormulario() {
    this.formularioRuta.patchValue({
      nombre_ruta: this.servicioRutas.rutaSeleccionada.nombre_ruta,
      nombre_empleado: this.servicioRutas.rutaSeleccionada.nombre_empleado
    })
  }

  obtenerInstalacionesPorIdRuta(id_ruta) {

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

    const subcribeInstalacionesDeRuta = this.servicioInstalaciones.obtenerInstalacionesPorIdRuta(id_ruta).subscribe(
      async (res) => {
        const result: any = res;

        this.instalacionesDeRuta = result.instalaciones;

        this.instalacionesDeRuta.forEach((element, index) => {

          if (index === 0) {
            this.origin = {
              lat: Number(element.latitud),
              lng: Number(element.longitud)
            };
            return;
          }

          if (index === this.instalacionesDeRuta.length - 1) {

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
        
        if (this.instalacionesDeRuta.length < 2) {
          this.mostrarRuta = false;
        }else{
          this.mostrarRuta = true;
        }

        this.obtenerInstalacionesActivasSinRuta();

        subcribeInstalacionesDeRuta.unsubscribe();
      },
      async (err) => {
        console.log(err);
        subcribeInstalacionesDeRuta.unsubscribe();
        await Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/administrador/rutas/listar']);
      }
    )
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

    const subcribeInstalacionesSinRuta = this.servicioInstalaciones.obtenerInstalacionesActivasSinRuta().subscribe(
      async (res) => {
        const result: any = res;

        this.instalacionesSinRuta = result.instalaciones;
        subcribeInstalacionesSinRuta.unsubscribe();

        // console.log('Instalaciones de la ruta');
        // console.log(this.instalacionesDeRuta);
        // console.log('instalaciones sin ruta');
        // console.log(this.instalacionesSinRuta);

        this.rows = this.rows.concat(this.instalacionesDeRuta, this.instalacionesSinRuta);
        this.selected = this.selected.concat(this.instalacionesDeRuta);


        Swal.close();
      },
      err => {
        console.log(err);
        subcribeInstalacionesSinRuta.unsubscribe();
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

    let ordenEnRuta = 0;

    this.selected = selected.map(
      element => {
        ordenEnRuta++;
        element.orden_en_ruta = ordenEnRuta;
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
      
      if (index === this.selected.length-1) {
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
    }else{
      this.mostrarRuta = true;
    }

    

  }

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

}
