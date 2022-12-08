import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { VentasService } from 'src/app/servicios/ventas/ventas.service';
import { Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';
import * as uuid from 'uuid';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';


declare var Swal:any;
declare var $:any;
declare var moment:any;


@Component({
  selector: 'app-modificar-venta',
  templateUrl: './modificar-venta.component.html',
  styleUrls: ['./modificar-venta.component.css']
})
export class ModificarVentaComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFieldComprobante', { static: false }) inputFieldComprobante: ElementRef;

  fileToUpload: File = null;

  cambioComprobante: string = 'no';

  onFileChange(files: FileList) {
    this.cambioComprobante = 'si';
    this.labelImport.nativeElement.value = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  listaDeClientes: any;
  ventaSeleccionada:any;

  formularioVenta = new FormGroup({
    id_cliente: new FormControl(''),
    total_venta: new FormControl(0, [Validators.required]),
    ajuste: new FormControl(0, [Validators.required]),
    total_ajuste: new FormControl(0),
    numero_factura: new FormControl(''),
    numero_recibo: new FormControl(''),
    tipo_pago: new FormControl('', [Validators.required]),
    detalle: new FormControl(''),
    importFile: new FormControl('')
  });
  @ViewChild('fecha_venta') fecha_venta: ElementRef;

  llenarFormulario(){
    this.formularioVenta.controls.total_venta.setValue(this.ventaSeleccionada.total_venta);
    this.formularioVenta.controls.ajuste.setValue(this.ventaSeleccionada.ajuste);
    this.formularioVenta.controls.total_ajuste.setValue(Number(this.ventaSeleccionada.total_venta) + Number(this.ventaSeleccionada.ajuste));
    this.formularioVenta.controls.numero_factura.setValue(this.ventaSeleccionada.numero_factura);
    this.formularioVenta.controls.numero_recibo.setValue(this.ventaSeleccionada.numero_recibo);
    this.formularioVenta.controls.detalle.setValue(this.ventaSeleccionada.detalle);
    this.formularioVenta.controls.tipo_pago.setValue(this.ventaSeleccionada.tipo_pago);
  }


  constructor(
    private servicioClientes: ClientesService,
    private servicioVentas: VentasService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService,
    private servicioAutenticacion: AutenticacionService
  ) {
    if (!this.servicioVentas.ventaSeleccionada) {
      this.router.navigate(['/administrador/ventas/listar']);
      return
    }
    this.ventaSeleccionada = this.servicioVentas.ventaSeleccionada;
    console.log(this.ventaSeleccionada);
    
   }

  ngOnInit(): void {
    this.llenarFormulario();
    this.configuracionDatePickers();
    this.cargarClientes();
  }

  ngAfterViewInit() {
    this.labelImport.nativeElement.value = this.ventaSeleccionada.nombre_archivo_comprobante;

    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });

    $('.selectpicker').selectpicker('refresh');
    $('#selectTipoPago').selectpicker('val', this.ventaSeleccionada.tipo_pago);
  }

  ngOnDestroy(){
    this.servicioVentas.ventaSeleccionada = null;
  }

  async onSubmit() {

    console.log(this.formularioVenta.controls);
    

    if (!this.formularioVenta.valid) {
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
      title: 'Modificando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioVenta.value;
    datos.fecha_venta = moment(this.fecha_venta.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    datos.id_usuario = this.servicioAutenticacion.usuarioLogueado.id_usuario;
    datos.id_cliente = this.ventaSeleccionada.id_cliente;
    datos.id_transaccion = this.ventaSeleccionada.id_transaccion;
    datos.id_venta = this.ventaSeleccionada.id_venta;

    datos.nombre_archivo_comprobante = this.ventaSeleccionada.nombre_archivo_comprobante;
    datos.url_comprobante = this.ventaSeleccionada.url_comprobante;
    datos.cambioComprobante = this.cambioComprobante;


    if (this.cambioComprobante === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/comprobantes/ventas';

      console.log('subiendo archivo');
      

     await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(
        url => {
        datos.nombre_archivo_comprobante = nuevoNombreArchivo;
        datos.url_comprobante = url; 
        datos.nombre_archivo_comprobante_borrar = this.ventaSeleccionada.nombre_archivo_comprobante;

        console.log(url);
       } 

      );//fin subida de archivo


    }


    console.log(datos);



    this.servicioVentas.modificarVenta(datos).subscribe(
      async (res) => {
        console.log(res);
        const result: any = res;

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          confirmButtonText: 'Aceptar',
        });


        this.router.navigate(['/administrador/ventas/listar']);

      },
      err => {

        console.log(err);

        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

      }
    )

  }

  cargarClientes() {
    const subcripcionClientes = this.servicioClientes.obtenerClientes().subscribe(
      res => {
        const result: any = res;
        this.listaDeClientes = result.clientes;
        console.log(this.listaDeClientes);

        subcripcionClientes.unsubscribe();
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          $('#selectCliente').selectpicker('val', this.ventaSeleccionada.id_cliente);
        }, 200);
      },
      err => {
        console.log(err);

      }
    )
  }

  configuracionDatePickers() {

    // const fechaEspaniol:string = this.ventaSeleccionada.fecha_transaccion_usuario;
    // const arrayFechaUsuario =  fechaEspaniol.split(' ');
    // const fecha = arrayFechaUsuario[0] + '/' + moment().month(arrayFechaUsuario[2]).format("M") + '/' + arrayFechaUsuario[4];    

    $('#fecha_venta').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: moment(),
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
      date: moment(this.ventaSeleccionada.fecha_transaccion_usuario),
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

  onKeyUpAjuste() {

    let total_venta = this.formularioVenta.controls.total_venta.value;
    let ajuste = this.formularioVenta.controls.ajuste.value;
    let total: number = 0;


    if (ajuste === null || total_venta === null) {// ajuste no es un numero
      ajuste = 0;
      this.formularioVenta.controls.total_ajuste.setValue(0);
      return;
    }

    total = parseFloat(total_venta) + parseFloat(ajuste);
    this.formularioVenta.controls.total_ajuste.setValue(total.toFixed(2));

  }

}
