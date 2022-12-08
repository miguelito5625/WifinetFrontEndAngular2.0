import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';


declare var $: any;
declare var Swal: any;
declare var moment: any;
// declare var google:any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit, AfterViewInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  @ViewChild('buscarDireccion', {static: true} ) public buscarDireccion: ElementRef;
  private geoCoder;




  @ViewChild('fecha_nacimiento') fecha_nacimiento: ElementRef;

  listaDepartamentos: Array<any> = [];

  listaMunicipios: Array<any> = [];
  listaMunicipiosFiltrados: Array<any> = [];

  listaBarrios: Array<any> = [];
  listaBarriosFiltrados: Array<any> = [];

  formularioCliente = new FormGroup({
    cui: new FormControl('', [Validators.required]),
    primer_nombre: new FormControl(''),
    segundo_nombre: new FormControl(''),
    primer_apellido: new FormControl(''),
    segundo_apellido: new FormControl(''),
    departamento: new FormControl(''),
    municipio: new FormControl(''),
    barrio: new FormControl(''),
    especificacion: new FormControl(''),
    // latitud: new FormControl(''),
    // longitud: new FormControl(''),
    telefono: new FormControl(''),
    correo_electronico: new FormControl('')
  });

  constructor(
    private servicioClientes: ClientesService,
    private servicioDirecciones: DireccionesService,
    private router: Router,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) {
    this.inicializarMapas();
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

  ngOnInit(): void {
    // $('#modalMapa').modal('show');
    this.configuracionDatePickers();
    this.cargarDepartamentos();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  onKeyUpInput() {
    console.log(this.formularioCliente.controls.correo_electronico.valid);
    // this.formularioCliente.controls.correo_electronico.touched
  }

  abrirMapa(){
    $('#modalMapa').modal('show');
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
      title: 'Creando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioCliente.value;

    datos.fecha_nacimiento = moment(this.fecha_nacimiento.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    delete datos.departamento;
    delete datos.municipio;
    datos.id_barrio = datos.barrio;
    delete datos.barrio;

    datos.latitud = this.latitude;
    datos.longitud = this.longitude;

    console.log(datos);

    // return;

    this.servicioClientes.crearCliente(datos).subscribe(
      async (res) => {
        console.log(res);
        const result: any = res;

        await Swal.fire({
          title: 'Creado!',
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
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

      }
    );

  }

  configuracionDatePickers() {

    $('#idfecha_nacimiento').datetimepicker({
      format: 'DD/MM/YYYY',
      minDate: moment().subtract(60, 'years'),
      maxDate: moment().subtract(18, 'years'),
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

  cargarDepartamentos() {
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
    const subcripcionDepartamentos = this.servicioDirecciones.obtenerDepartamentos().subscribe(
      res => {
        const respuesta: any = res;
        this.listaDepartamentos = respuesta.departamentos;
        subcripcionDepartamentos.unsubscribe();
        this.cargarMunicipios();
      },
      err => {
        console.log(err);
      }
    );


  }

  cargarMunicipios(){
    const subcripcionMunicipios = this.servicioDirecciones.obtenerMunicipios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaMunicipios = respuesta.municipios;
        subcripcionMunicipios.unsubscribe();
        this.cargarBarrios();
      },
      err => {
        console.log(err);
      }
    );

  }

  cargarBarrios(){

    const subcripcionBarrios = this.servicioDirecciones.obtenerBarrios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaBarrios = respuesta.barrios;
        subcripcionBarrios.unsubscribe();
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          Swal.close();
        }, 200);
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
    console.log(this.formularioCliente.controls.barrio.value);
        
    this.listaBarriosFiltrados = this.listaBarrios.filter(function (br) {
      return br.id_municipio == id_municipio;
    });
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 200);

  }




}
