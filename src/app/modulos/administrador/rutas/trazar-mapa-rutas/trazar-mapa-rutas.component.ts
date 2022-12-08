import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RutasService } from 'src/app/servicios/rutas/rutas.service';
import { Router } from '@angular/router';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { MapsAPILoader } from '@agm/core';

import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';


declare var Swal: any;

@Component({
  selector: 'app-trazar-mapa-rutas',
  templateUrl: './trazar-mapa-rutas.component.html',
  styleUrls: ['./trazar-mapa-rutas.component.css']
})
export class TrazarMapaRutasComponent implements OnInit, AfterViewInit, OnDestroy {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  private geoCoder;


  public waypoints: Array<any> = [];
  public origin: any;
  public destination: any;

  // listaCoordenadas = [];

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
    console.log(this.servicioRutas.rutaSeleccionada);
    this.inicializarMapas();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.obtenerInstalacionesPorIdRuta(this.servicioRutas.rutaSeleccionada.id_ruta);
  }

  ngOnDestroy() {
    this.servicioRutas.rutaSeleccionada = null;
  }


  crearImagen() {

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

    htmlToImage.toBlob(document.getElementById('idRutaMapa'))
      .then(function (blob) {
        saveAs.saveAs(blob, `${new Date}.png`);
        Swal.close();
      });
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

    const subscribeInstalaciones = this.servicioInstalaciones.obtenerInstalacionesPorIdRuta(id_ruta).subscribe(
      res => {
        const result: any = res;
        console.log(result);

        result.instalaciones.forEach((element, index) => {

          if (index === 0) {
            this.origin = {
              lat: Number(element.latitud),
              lng: Number(element.longitud)
            };
            return;
          }

          if (index === result.instalaciones.length - 1) {

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
        Swal.close();
        subscribeInstalaciones.unsubscribe();
      },
      async (err) => {
        console.log(err);
        subscribeInstalaciones.unsubscribe();
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

}
