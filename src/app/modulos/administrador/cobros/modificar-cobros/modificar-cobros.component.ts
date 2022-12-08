import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CobrosService } from 'src/app/servicios/cobros/cobros.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';
import * as uuid from 'uuid';

declare var $: any;
declare var Swal: any;
declare var moment: any;


@Component({
  selector: 'app-modificar-cobros',
  templateUrl: './modificar-cobros.component.html',
  styleUrls: ['./modificar-cobros.component.css']
})
export class ModificarCobrosComponent implements OnInit, OnDestroy, AfterViewInit {

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

  @ViewChild('fecha_transaccion_usuario') fecha_transaccion_usuario: ElementRef;


  formularioCobro = new FormGroup({
    nombre_cliente: new FormControl(''),
    mes_de_pago: new FormControl(''),
    anio_de_pago: new FormControl(''),
    subTotal: new FormControl(''),
    ajuste: new FormControl(0),
    totalAPagar: new FormControl(''),
    numeroFactura: new FormControl(''),
    numeroRecibo: new FormControl(''),
    detalle: new FormControl(''),
    tipo_pago: new FormControl('', [Validators.required]),
    direccion_cliente: new FormControl(''),
    nombre_plan: new FormControl(''),
    importFile: new FormControl('')
  });

  constructor(
    private servicioCobros: CobrosService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService
  ) {
    if (!this.servicioCobros.cobroSeleccionado) {
      this.router.navigate(['/administrador/cobros/listar']);
      return;
    }
    console.log(this.servicioCobros.cobroSeleccionado);
    
   }

  ngOnInit(): void {
    this.configuracionDatePickers();
    this.llenarFormulario();
  }

  ngOnDestroy(){
    this.servicioCobros.cobroSeleccionado = null;
  }

  ngAfterViewInit(){
    $('.selectpicker').selectpicker('refresh');
    $('#selectTipoPago').selectpicker('val', this.servicioCobros.cobroSeleccionado.tipo_pago);
    this.labelImport.nativeElement.value = this.servicioCobros.cobroSeleccionado.nombre_archivo_comprobante;

    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });
  }


  async onSubmit(){

    if (!this.formularioCobro.valid) {
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
      title: 'Actualizando datos',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos:any = {
      id_transaccion: this.servicioCobros.cobroSeleccionado.id_transaccion,
      fecha_transaccion_usuario: moment(this.fecha_transaccion_usuario.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD"),
      ajuste : this.formularioCobro.controls.ajuste.value,
      total: this.formularioCobro.controls.totalAPagar.value,
      numero_factura: this.formularioCobro.controls.numeroFactura.value,
      numero_recibo: this.formularioCobro.controls.numeroRecibo.value,
      tipo_pago: this.formularioCobro.controls.tipo_pago.value,
      detalle: this.formularioCobro.controls.detalle.value
    }

    datos.nombre_archivo_comprobante = this.servicioCobros.cobroSeleccionado.nombre_archivo_comprobante;
    datos.url_comprobante = this.servicioCobros.cobroSeleccionado.url_comprobante;
    datos.cambioComprobante = this.cambioComprobante;

    if (this.cambioComprobante === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/comprobantes/cobrosDeMensualidad';

      console.log('subiendo archivo');
      

     await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(
        url => {
        datos.nombre_archivo_comprobante = nuevoNombreArchivo;
        datos.url_comprobante = url; 
        datos.nombre_archivo_comprobante_borrar = this.servicioCobros.cobroSeleccionado.nombre_archivo_comprobante;

        console.log(url);
       } 

      );//fin subida de archivo


    }

    console.log(datos);

    this.servicioCobros.modificarCobro(datos).subscribe(
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
    
        this.router.navigate(['/administrador/cobros/listar']);
        
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


  llenarFormulario(){
    this.formularioCobro.controls.nombre_cliente.setValue(this.servicioCobros.cobroSeleccionado.nombre_cliente);
    this.formularioCobro.controls.direccion_cliente.setValue(this.servicioCobros.cobroSeleccionado.direccion_instalacion);
    this.formularioCobro.controls.nombre_plan.setValue(this.servicioCobros.cobroSeleccionado.nombre_plan);
    this.formularioCobro.controls.mes_de_pago.setValue(this.servicioCobros.cobroSeleccionado.mes_de_pago);
    this.formularioCobro.controls.anio_de_pago.setValue(this.servicioCobros.cobroSeleccionado.anio_de_pago);
    this.formularioCobro.controls.subTotal.setValue(Number(this.servicioCobros.cobroSeleccionado.total) - Number(this.servicioCobros.cobroSeleccionado.ajuste));
    this.formularioCobro.controls.ajuste.setValue(this.servicioCobros.cobroSeleccionado.ajuste);
    this.formularioCobro.controls.totalAPagar.setValue(this.servicioCobros.cobroSeleccionado.total);
    this.formularioCobro.controls.numeroFactura.setValue(this.servicioCobros.cobroSeleccionado.numero_factura);
    this.formularioCobro.controls.numeroRecibo.setValue(this.servicioCobros.cobroSeleccionado.numero_recibo);
    this.formularioCobro.controls.detalle.setValue(this.servicioCobros.cobroSeleccionado.detalle);
    this.formularioCobro.controls.tipo_pago.setValue(this.servicioCobros.cobroSeleccionado.tipo_pago);

  }

  onKeyUpAjuste() {
    const precio_instalacion = this.formularioCobro.controls.subTotal.value;
    let ajuste = this.formularioCobro.controls.ajuste.value;
    let total: number = 0;

    if (isNaN(ajuste) || ajuste === '') {// ajuste no es un numero
      ajuste = 0;
    }

    total = parseFloat(precio_instalacion) + parseFloat(ajuste);
    this.formularioCobro.controls.totalAPagar.setValue(total.toFixed(2));

  }


  configuracionDatePickers() {

    $('#idfecha_transaccion_usuario').datetimepicker({
      format: 'DD/MM/YYYY',
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
      date: moment(this.servicioCobros.cobroSeleccionado.fecha_transaccion_usuario),
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

}
