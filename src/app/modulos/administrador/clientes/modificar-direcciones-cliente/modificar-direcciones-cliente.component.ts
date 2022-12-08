import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { async } from 'rxjs/internal/scheduler/async';
import { MapsAPILoader } from '@agm/core';

declare var $: any;
declare var Swal:any;

@Component({
  selector: 'app-modificar-direcciones-cliente',
  templateUrl: './modificar-direcciones-cliente.component.html',
  styleUrls: ['./modificar-direcciones-cliente.component.css']
})
export class ModificarDireccionesClienteComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  @ViewChild('buscarDireccion', {static: true} ) public buscarDireccion: ElementRef;
  private geoCoder;

  direccionSeleccionada: any;
  clienteSeleccionado: any;

  listaDepartamentos: Array<any> = [];

  listaMunicipios: Array<any> = [];
  listaMunicipiosFiltrados: Array<any> = [];

  listaBarrios: Array<any> = [];
  listaBarriosFiltrados: Array<any> = [];

  formularioCliente = new FormGroup({
    departamento: new FormControl(''),
    municipio: new FormControl(''),
    barrio: new FormControl('', [Validators.required]),
    especificacion: new FormControl('', [Validators.required]),
  });

  constructor(
    private servicioClientes: ClientesService,
    private servicioDirecciones: DireccionesService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    if (!this.servicioClientes.direccionSeleccionada) {
      router.navigate(['/administrador/clientes/listar']);
      return;
    }
    this.direccionSeleccionada = this.servicioClientes.direccionSeleccionada;
    this.clienteSeleccionado = this.servicioClientes.clienteSeleccionado;
    console.log(this.direccionSeleccionada);
    // this.zoom = 18;
    // this.latitude = this.direccionSeleccionada.latitud;
    // this.longitude = this.direccionSeleccionada.longitud;
    this.inicializarMapas();

  }

  ngOnInit(): void {
    this.cargarDatosDireccion();
    this.llenarFormulario();
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
    this.latitude = Number(this.direccionSeleccionada.latitud);
    this.longitude = Number(this.direccionSeleccionada.longitud);
    this.zoom = 18;
  }
  
  placeMarker($event){
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  abrirMapa(){
    $('#modalMapa').modal('show');
  }

  llenarFormulario(){
    this.formularioCliente.controls.especificacion.setValue(this.direccionSeleccionada.especificacion);
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
      title: 'Modificando dirección',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioCliente.value;
    datos.id_direccion = this.direccionSeleccionada.id_direccion;
    datos.id_barrio = this.formularioCliente.controls.barrio.value;
    datos.especificacion = this.formularioCliente.controls.especificacion.value;
    datos.latitud = this.latitude;
    datos.longitud = this.longitude;

    delete datos.departamento;
    delete datos.municipio;
    delete datos.barrio;

    console.log(datos);

    this.servicioClientes.modificarDireccion(datos).subscribe(
      async (res) => {

        const result: any = res;

        await Swal.fire({
          title: 'Dirección modificada!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/administrador/clientes/listar']);

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
      async (res) => {
        const respuesta: any = res;
        this.listaDepartamentos = respuesta.departamentos;

        
        subcripcionDepartamentos.unsubscribe();


      },
      err => {
        console.log(err);
      }
    );

    const subcripcionMunicipios = this.servicioDirecciones.obtenerMunicipios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaMunicipios = respuesta.municipios;

        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          $('#selectDepartamento').selectpicker('val', this.direccionSeleccionada.id_departamento);
          this.formularioCliente.controls.departamento.setValue(this.direccionSeleccionada.id_departamento);
          this.cambioDepartamento();

        }, 200);

        


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

        setTimeout(() => {
          $('#selectMunicipio').selectpicker('val', this.direccionSeleccionada.id_municipio);
          this.formularioCliente.controls.municipio.setValue(this.direccionSeleccionada.id_municipio);
          this.cambioMunicipio();
        }, 400);

       setTimeout(() => {
          $('#selectBarrio').selectpicker('val', this.direccionSeleccionada.id_barrio);
          this.formularioCliente.controls.barrio.setValue(this.direccionSeleccionada.id_barrio);
        }, 600);

      },
      err => {
        console.log(err);
      }
    );


  }

  cambioDepartamento() {
    const id_departamento = this.formularioCliente.controls.departamento.value;
    // console.log(id_departamento);


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
