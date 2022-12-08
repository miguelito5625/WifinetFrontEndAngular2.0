import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';

import * as uuid from 'uuid';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';


declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-crear-boleta-deposito',
  templateUrl: './crear-boleta-deposito.component.html',
  styleUrls: ['./crear-boleta-deposito.component.css']
})
export class CrearBoletaDepositoComponent implements OnInit, AfterViewInit {

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFilePdf', { static: false }) inputFilePdf: ElementRef;

  fileToUpload: File = null;

  onFileChange(files: FileList) {
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
    importFile: new FormControl('', [Validators.required])   
  });


  constructor(
    private servicioBoletasDeposito: BoletaDepositoService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService,
    private servicioAutenticacion: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.configuracionDatePickers();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function() {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });
  }


  async onSubmit(){

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
     title: 'Creando',
     icon: 'info',
     html: 'Por favor, espere',
     timerProgressBar: true,
     allowOutsideClick: false,
     onBeforeOpen: () => {
       Swal.showLoading()
     }
   });

    let datos:any = {
      numero_boleta: this.formularioBoleta.controls.numero_boleta.value,
      fecha_deposito: moment(this.fecha_deposito.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD"),
      monto_depositado: this.formularioBoleta.controls.monto_depositado.value.toFixed(2),
      nombre_banco: this.formularioBoleta.controls.nombre_banco.value,
      id_usuario: this.servicioAutenticacion.usuarioLogueado.id_usuario
    };

    const archivo = this.fileToUpload;
    const nombreArchivo:string = this.labelImport.nativeElement.value;
    const extensionArchivo = nombreArchivo.split('.').pop();
    var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
    const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
    const directorio = '/wifinet/boletasDeDeposito';


    this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(url =>{
      datos.nombre_archivo_boleta = nuevoNombreArchivo;
      datos.url_boleta = url; 

      this.servicioBoletasDeposito.crearBoletaDeposito(datos).subscribe(
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
  
          this.router.navigate(['/tecnicocobrador/boletas-deposito/listar']);
          
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

    });



  }

  configuracionDatePickers() {

    $('#idfecha_deposito').datetimepicker({
      format: 'DD/MM/YYYY',
      ignoreReadonly: true,
      allowInputToggle: true,
      locale: 'es',
      date: moment(),
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

}
