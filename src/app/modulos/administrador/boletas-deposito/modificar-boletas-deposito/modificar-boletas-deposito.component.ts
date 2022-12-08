import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';

import * as uuid from 'uuid';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';


declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-modificar-boletas-deposito',
  templateUrl: './modificar-boletas-deposito.component.html',
  styleUrls: ['./modificar-boletas-deposito.component.css']
})
export class ModificarBoletasDepositoComponent implements OnInit, OnDestroy {

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFilePdf', { static: false }) inputFilePdf: ElementRef;

  fileToUpload: File = null;

  cambioBoleta: string = 'no';
  onFileChange(files: FileList) {
    this.cambioBoleta = 'si';
    this.labelImport.nativeElement.value = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }


  @ViewChild('fecha_deposito') fecha_deposito: ElementRef;

  formularioBoleta = new FormGroup({
    numero_boleta: new FormControl('', [Validators.required]),
    nombre_banco: new FormControl('', [Validators.required]),
    monto_depositado: new FormControl('', [Validators.required]),
    importFile: new FormControl('')
  });


  constructor(
    private servicioBoletasDeposito: BoletaDepositoService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService,
    private servicioAutenticacion: AutenticacionService
  ) {
    if (!this.servicioBoletasDeposito.boletaDepositoSeleccionada) {
      this.router.navigate(['/administrador/boletas-deposito/listar']);
      return;
    }
    console.log(this.servicioBoletasDeposito.boletaDepositoSeleccionada);

  }

  ngOnInit(): void {
    this.configuracionDatePickers();
    this.llenarFormulario();
  }

  ngAfterViewInit() {
    this.labelImport.nativeElement.value = this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_archivo_boleta;
    $('.selectpicker').selectpicker('render');
    $('#selectNombreBanco').selectpicker('val', this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_banco);
    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });
  }

  ngOnDestroy(){
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = null;
  }

  llenarFormulario() {
    this.formularioBoleta.controls.numero_boleta.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.numero_boleta);
    this.formularioBoleta.controls.nombre_banco.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_banco);
    this.formularioBoleta.controls.monto_depositado.setValue(this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado);

  }

  async onSubmit() {

    if (!this.formularioBoleta.valid) {
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
      title: 'Procesando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos: any = {
      id_boleta_deposito: this.servicioBoletasDeposito.boletaDepositoSeleccionada.id,
      numero_boleta: this.formularioBoleta.controls.numero_boleta.value,
      fecha_deposito: moment(this.fecha_deposito.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD"),
      monto_depositado: this.formularioBoleta.controls.monto_depositado.value,
      nombre_banco: this.formularioBoleta.controls.nombre_banco.value,
      id_usuario: this.servicioAutenticacion.usuarioLogueado.id_usuario,
      nombre_archivo_boleta: this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_archivo_boleta,
      url_boleta: this.servicioBoletasDeposito.boletaDepositoSeleccionada.url_boleta,
      cambioBoleta: this.cambioBoleta
    };


    if (this.cambioBoleta === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/boletasDeDeposito';

      await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(
        url => {
        datos.nombre_archivo_boleta = nuevoNombreArchivo;
        datos.url_boleta = url; 
        datos.nombre_archivo_boleta_borrar = this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_archivo_boleta;
       } 

      );//fin subida de archivo

    }
    
    this.servicioBoletasDeposito.actualizarBoletaDeposito(datos).subscribe(
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

        this.router.navigate(['/administrador/boletas-deposito/listar']);
        
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
    );


  }


  configuracionDatePickers() {

    $('#idfecha_deposito').datetimepicker({
      format: 'DD/MM/YYYY',
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
      date: moment(this.servicioBoletasDeposito.boletaDepositoSeleccionada.fecha_deposito),
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

}
