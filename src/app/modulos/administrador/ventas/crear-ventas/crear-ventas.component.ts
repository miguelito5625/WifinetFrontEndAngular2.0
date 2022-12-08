import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { VentasService } from 'src/app/servicios/ventas/ventas.service';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';
import * as uuid from 'uuid';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';
import { ArchivosRecibosService } from 'src/app/servicios/archivos-recibos/archivos-recibos.service';


declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-crear-ventas',
  templateUrl: './crear-ventas.component.html',
  styleUrls: ['./crear-ventas.component.css']
})
export class CrearVentasComponent implements OnInit, AfterViewInit {

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

  formularioVenta = new FormGroup({
    id_cliente: new FormControl('', [Validators.required]),
    total_venta: new FormControl(0, [Validators.required]),
    ajuste: new FormControl(0, [Validators.required]),
    total_ajuste: new FormControl(0),
    numero_factura: new FormControl(''),
    numero_recibo: new FormControl(''),
    tipo_pago: new FormControl('', [Validators.required]),
    detalle: new FormControl('', [Validators.required]),
    importFile: new FormControl('')
  });
  @ViewChild('fecha_venta') fecha_venta: ElementRef;


  constructor(
    private servicioClientes: ClientesService,
    private servicioVentas: VentasService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService,
    private servicioAutenticacion: AutenticacionService,
    private servicioRecibos: ArchivosRecibosService
  ) { }

  ngOnInit(): void {
    this.configuracionDatePickers();
    this.cargarClientes();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('refresh');

    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });

  }

  async onSubmit() {

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

    const tipo_pago = this.formularioVenta.controls.tipo_pago.value;

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

    let datos = this.formularioVenta.value;
    datos.fecha_venta = moment(this.fecha_venta.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    datos.id_usuario = this.servicioAutenticacion.usuarioLogueado.id_usuario;
    console.log(datos);

    if (this.cambioComprobante === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/comprobantes/ventas';

      await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(url => {
        datos.nombre_archivo_comprobante = nuevoNombreArchivo;
        datos.url_comprobante = url;

      });//fin subida de archivo

    }

    this.servicioVentas.crearVenta(datos).subscribe(
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
          text: err.message,
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
        }, 200);
      },
      err => {
        console.log(err);

      }
    )
  }

  configuracionDatePickers() {

    $('#fecha_venta').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: moment(),
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
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
