import { Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';

import { MapsAPILoader, MouseEvent } from '@agm/core';


declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-agregar-direccion-cliente',
  templateUrl: './agregar-direccion-cliente.component.html',
  styleUrls: ['./agregar-direccion-cliente.component.css']
})
export class AgregarDireccionClienteComponent implements OnInit, AfterViewInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  @ViewChild('buscarDireccion', {static: true} ) public buscarDireccion: ElementRef;
  private geoCoder;

  clienteSeleccionado: any;

  listaDepartamentos: Array<any> = [];

  listaMunicipios: Array<any> = [];
  listaMunicipiosFiltrados: Array<any> = [];

  listaBarrios: Array<any> = [];
  listaBarriosFiltrados: Array<any> = [];

  formularioCliente = new FormGroup({
    departamento: new FormControl(''),
    municipio: new FormControl(''),
    barrio: new FormControl(''),
    especificacion: new FormControl(''),
  });

  constructor(
    private servicioClientes: ClientesService,
    private servicioDirecciones: DireccionesService,
    private router: Router,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) {
    if (!this.servicioClientes.clienteSeleccionado) {
      router.navigate(['/tecnicocobrador/clientes/listar']);
      return;
    }
    this.inicializarMapas();
    this.clienteSeleccionado = this.servicioClientes.clienteSeleccionado;
  }

  inicializarMapas(){
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {
      
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.buscarDireccion.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          this.zoom = 18;
        });
      });
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
  
  placeMarker($event){
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  abrirMapa(){
    $('#modalMapa').modal('show');
  }



  ngOnInit(): void {
    console.log(this.servicioClientes.clienteSeleccionado);
    this.cargarDatosDireccion();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  async onSubmit() {

    if (!this.formularioCliente.valid) {
      await Swal.fire({
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
      title: 'Creando Dirección',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioCliente.value;
    datos.id_persona = this.clienteSeleccionado.id_persona;
    datos.id_barrio = datos.barrio;
    delete datos.barrio;
    delete datos.departamento;
    delete datos.municipio;
    datos.latitud = this.latitude;
    datos.longitud = this.longitude;
    console.log(datos);

    this.servicioClientes.agregarDireccion(datos).subscribe(
      async (res) => {
        const result: any = res;

        await Swal.fire({
          title: 'Dirección agregada!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/tecnicocobrador/clientes/listar']);

      },
      err => {
        console.log(err);

        Swal.fire({
          title: 'Error!',
          text: 'El servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )

  }

  cargarDatosDireccion() {

    const subcripcionDepartamentos = this.servicioDirecciones.obtenerDepartamentos().subscribe(
      res => {
        const respuesta: any = res;
        this.listaDepartamentos = respuesta.departamentos;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          subcripcionDepartamentos.unsubscribe();
        }, 200);
      },
      err => {
        console.log(err);
      }
    );

    const subcripcionMunicipios = this.servicioDirecciones.obtenerMunicipios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaMunicipios = respuesta.municipios;
        subcripcionMunicipios.unsubscribe();
      },
      err => {
        console.log(err);
      }
    );

    const subcripcionBarrios = this.servicioDirecciones.obtenerBarrios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaBarrios = respuesta.barrios;
        subcripcionBarrios.unsubscribe();
      },
      err => {
        console.log(err);
      }
    );


  }

  cambioDepartamento() {
    const id_departamento = this.formularioCliente.controls.departamento.value;

    this.listaMunicipiosFiltrados = this.listaMunicipios.filter(function (mp) {
      return mp.id_departamento == id_departamento;
    });

    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 200);

  }

  cambioMunicipio() {
    const id_municipio = this.formularioCliente.controls.municipio.value;
    this.listaBarriosFiltrados = this.listaBarrios.filter(function (br) {
      return br.id_municipio == id_municipio;
    });
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 200);

  }

}
