import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanesService } from 'src/app/servicios/planes/planes.service';
import { Router } from '@angular/router';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';
import * as uuid from 'uuid';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';


declare var $: any;
declare var moment: any;
declare var Swal: any;

@Component({
  selector: 'app-llenar-datos-instalacion',
  templateUrl: './llenar-datos-instalacion.component.html',
  styleUrls: ['./llenar-datos-instalacion.component.css']
})
export class LlenarDatosInstalacionComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFilePdf', { static: false }) inputFilePdf: ElementRef;

  fileToUpload: File = null;

  cambioComprobante: string = 'no';

  nombreClienteInstalacion:string;
  direccionCliente:String;


  onFileChange(files: FileList) {
    this.cambioComprobante = 'si';
    this.labelImport.nativeElement.value = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  @ViewChild('fecha_alta') fecha_alta: ElementRef;
  listaPlanes: any;
  estado: string = 'Activo';
  instalacionSeleccionada: any;
  id_costo_transacciones;

  //Datos para la queue
  nombrePlanCorto: string;
  clientePrimerNombreApellido: string;
  totalInstalaciones: string;

  //Datos del cliente que refiere
  clienteQueRefirio: any;
  nombreClienteQueRefiere: string;
  idClienteQueRefiere: number;


  formularioInstalacion = new FormGroup({
    ip_asignada: new FormControl('', [Validators.required, Validators.pattern('^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$')]),
    nombre_queue: new FormControl(''),
    id_plan: new FormControl(''),
    precio_instalacion: new FormControl('0'),
    ajuste: new FormControl('0'),
    tipo_pago: new FormControl(''),
    detalle: new FormControl(''),
    total: new FormControl('0'),
    numero_factura: new FormControl(''),
    numero_recibo: new FormControl(''),
    primer_mes_gratis: new FormControl(''),
    importFile: new FormControl('')
    // check_estado: new FormControl('')
  });


  constructor(
    private servicioTransaccionesInstalaciones: TransaccionesInstalacionesService,
    private servicioPlanes: PlanesService,
    private servicioCostosTransacciones: CostoTransaccionesService,
    private servicioClientes: ClientesService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService,
    private servicioDirecciones: DireccionesService,
    private servicioAutenticacion: AutenticacionService
  ) {
    if (!this.servicioTransaccionesInstalaciones.instalacionSeleccionada) {
      router.navigate(['/administrador/transacciones-instalaciones/listar']);
    }

    this.nombreClienteInstalacion = this.servicioClientes.clienteSeleccionado.nombre_completo;
    this.direccionCliente = this.servicioDirecciones.direccionSeleccionada.direccion_completa;

    //Datos instalacion seleccionada
    this.instalacionSeleccionada = this.servicioTransaccionesInstalaciones.instalacionSeleccionada;
    this.totalInstalaciones = this.servicioClientes.clienteSeleccionado.total_instalaciones;

    //Datos del cliente para instalacion
    this.clientePrimerNombreApellido = this.servicioClientes.clienteSeleccionado.primer_nombre + '_' + this.servicioClientes.clienteSeleccionado.primer_apellido;



    //Datos cliente que refiere
    this.clienteQueRefirio = this.servicioTransaccionesInstalaciones.clienteQueRefirio;
    this.nombreClienteQueRefiere = this.clienteQueRefirio ? this.clienteQueRefirio.primer_nombre + ' ' + this.clienteQueRefirio.segundo_nombre + ' ' + this.clienteQueRefirio.primer_apellido + ' ' + this.clienteQueRefirio.segundo_apellido : 'Sin Referencia';
    this.idClienteQueRefiere = this.clienteQueRefirio ? this.clienteQueRefirio.id_cliente : null;

  }

  ngOnInit(): void {
    this.configuracionDatePickers();
    this.obtenerPlanes();
    this.obtenerUltimoCostoInstalacion();
  }

  ngAfterViewInit() {
    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });
  }

  ngOnDestroy() {
    this.servicioTransaccionesInstalaciones.instalacionReferida = false;
    this.servicioTransaccionesInstalaciones.clienteQueRefirio = null;
    this.servicioClientes.clienteSeleccionado = null;
  }

  onChangePlanes(nombre_plan: string) {
    const array = nombre_plan.split(' ');
    // console.log(array[0]);
    const primerApellido = this.quitarAcentos(this.clientePrimerNombreApellido).replace(/ /g, '').replace(/ñ/g, 'n');
    const nombreQueue = (array[0] + 'M_' + primerApellido + '_0' + (this.totalInstalaciones + 1));
    this.formularioInstalacion.controls.nombre_queue.setValue(nombreQueue)
  }

  quitarAcentos(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  porcentaje = 0;
  finalizado = false;
  URLPublica = '';

  async onSubmit() {


    if (!this.formularioInstalacion.valid) {
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

    const tipo_pago = this.formularioInstalacion.controls.tipo_pago.value;

    if ((tipo_pago === 'Depósito' || tipo_pago === 'Transferencia') && this.cambioComprobante === 'no') {
      await Swal.fire({
        icon: 'error',
        title: 'Tiene que subir el archivo comprobante',
        text: 'Cuando el tipo de pago es depósito o transaferencia, es obligatorio subir el archivo',
        showCloseButton: true,
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


    let datos = this.formularioInstalacion.value;
    datos.id_usuario = this.servicioAutenticacion.usuarioLogueado.id_usuario;
    datos.fecha_alta = moment(this.fecha_alta.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    delete datos.precio_instalacion;
    datos.id_cliente = this.instalacionSeleccionada.id_cliente;
    datos.id_direccion = this.instalacionSeleccionada.id_direccion;
    datos.id_costo_transacciones = this.id_costo_transacciones;
    if (this.idClienteQueRefiere) {
      datos.id_cliente_refirio = this.idClienteQueRefiere;
    }
    console.log(datos);


    if (this.cambioComprobante === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/comprobantes/instalaciones';

     await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(url => {
        datos.nombre_archivo_comprobante = nuevoNombreArchivo;
        datos.url_comprobante = url;

      });//fin subida de archivo

    }



    if (this.servicioTransaccionesInstalaciones.instalacionReferida) {
      console.log('Instalacion referida');

      this.servicioTransaccionesInstalaciones.crearInstalacionReferida(datos).subscribe(
        async (res) => {
          console.log(res);
          const result: any = res;

          await Swal.fire({
            icon: 'success',
            title: result.message,
            showCloseButton: true,
            confirmButtonText: 'Aceptar',
          });


          this.router.navigate(['/administrador/transacciones-instalaciones/listar']);


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


    } else {
      console.log('instalacion normal');

      this.servicioTransaccionesInstalaciones.crearInstalacion(datos).subscribe(
        async (res) => {
          console.log(res);
          const result: any = res;

          await Swal.fire({
            icon: 'success',
            title: result.message,
            showCloseButton: true,
            confirmButtonText: 'Aceptar',
          });


          this.router.navigate(['/administrador/transacciones-instalaciones/listar']);


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




  }

  configuracionDatePickers() {

    $('#idfecha_alta').datetimepicker({
      format: 'DD/MM/YYYY',
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

  obtenerPlanes() {
    this.servicioPlanes.obtenerPlanesConCostoTransaccion().subscribe(
      res => {
        // console.log(res);
        const result: any = res;
        this.listaPlanes = result.planes
        setTimeout(() => {
          $('.selectpicker').selectpicker('render');
        }, 200);
      },
      err => {
        console.log(err);
      }
    )
  }

  OnChangeEstadoEmpleado() {
    if (this.formularioInstalacion.controls.check_estado.value) {
      this.estado = 'Activo';
    } else {
      this.estado = 'Inactivo';
    }
  }

  obtenerUltimoCostoInstalacion() {
    this.servicioCostosTransacciones.obtenerCostoInstalacionVigente().subscribe(
      res => {
        const result: any = res;
        // console.log(result);
        this.formularioInstalacion.controls.precio_instalacion.setValue(result.costo_instalacion.costo)
        this.formularioInstalacion.controls.total.setValue(result.costo_instalacion.costo)
        this.id_costo_transacciones = result.costo_instalacion.id_costo_transacciones;

      },
      err => {
        console.log(err);
        this.formularioInstalacion.controls.precio_instalacion.setValue('error precio instalacion')
      }
    )
  }

  onKeyUpAjuste() {
    const precio_instalacion = this.formularioInstalacion.controls.precio_instalacion.value;
    let ajuste = this.formularioInstalacion.controls.ajuste.value;
    let total: number = 0;

    if (isNaN(ajuste) || ajuste === '') {// ajuste no es un numero
      ajuste = 0;
    }

    total = parseFloat(precio_instalacion) + parseFloat(ajuste);
    this.formularioInstalacion.controls.total.setValue(total.toFixed(2));

  }

}
