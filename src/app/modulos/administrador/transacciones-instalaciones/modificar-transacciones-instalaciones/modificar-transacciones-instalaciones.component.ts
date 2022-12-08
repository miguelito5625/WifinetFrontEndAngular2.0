import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanesService } from 'src/app/servicios/planes/planes.service';
import { async } from 'rxjs/internal/scheduler/async';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';
import * as uuid from 'uuid';


declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-modificar-transacciones-instalaciones',
  templateUrl: './modificar-transacciones-instalaciones.component.html',
  styleUrls: ['./modificar-transacciones-instalaciones.component.css']
})
export class ModificarTransaccionesInstalacionesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('labelImport') labelImport: ElementRef;
  @ViewChild('inputFilePdf', { static: false }) inputFilePdf: ElementRef;

  fileToUpload: File = null;

  cambioComprobante: string = 'no';

  onFileChange(files: FileList) {
    this.cambioComprobante = 'si';
    this.labelImport.nativeElement.value = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  instalacionSeleccionada: any;
  listaPlanes: any;


  formularioInstalacion = new FormGroup({
    id_plan: new FormControl(''),
    ip_asignada: new FormControl('', [Validators.required, Validators.pattern('^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$')]),
    nombre_queue: new FormControl(''),
    numero_factura: new FormControl(''),
    importFile: new FormControl('')
  });

  constructor(
    private servicionInstalacion: TransaccionesInstalacionesService,
    private servicioPlanes: PlanesService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService
  ) {
    console.log(this.servicionInstalacion.instalacionSeleccionada);
    if (!this.servicionInstalacion.instalacionSeleccionada) {
      this.router.navigate(['/administrador/transacciones-instalaciones/listar']);
      return;
    }

    this.instalacionSeleccionada = this.servicionInstalacion.instalacionSeleccionada;
    console.log(this.instalacionSeleccionada);



  }

  ngOnInit(): void {
    this.llenarFormulario();
    this.obtenerPlanes();
  }

  ngAfterViewInit() {
    this.labelImport.nativeElement.value = this.instalacionSeleccionada.nombre_archivo_comprobante;

    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });
  }

  ngOnDestroy() {
    this.servicionInstalacion.instalacionSeleccionada = null;
  }

  llenarFormulario() {
    this.formularioInstalacion.controls.ip_asignada.setValue(this.instalacionSeleccionada.ip_asignada);
    this.formularioInstalacion.controls.nombre_queue.setValue(this.instalacionSeleccionada.nombre_queue);
    this.formularioInstalacion.controls.numero_factura.setValue(this.instalacionSeleccionada.numero_factura);
    this.formularioInstalacion.controls.id_plan.setValue(this.instalacionSeleccionada.id_plan);
  }

  onChangePlanes(nombre_plan: string) {
    const arrayNombrePlan = nombre_plan.split(' ');
    let arrayNonbreQueue = this.instalacionSeleccionada.nombre_queue.split('_');
    arrayNonbreQueue[0] = arrayNombrePlan[0] + 'M';
    this.formularioInstalacion.controls.nombre_queue.setValue(arrayNonbreQueue[0] + '_' + arrayNonbreQueue[1] + '_' + arrayNonbreQueue[2] + '_' + arrayNonbreQueue[3]);
  }

  async onSubmit() {    

    if (!this.formularioInstalacion.valid) {
      await Swal.fire({
        icon: 'error',
        title: 'Hay campos incorrectos',
        text: 'Por favor llene cada campo correctamente',
        showCloseButton: true,
        confirmButtonText: 'Entedido',
      });
      return;
    }

    Swal.fire({
      title: 'Modificando instalación',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioInstalacion.value;
    datos.id_instalacion = this.instalacionSeleccionada.id_instalacion;
    datos.id_transaccion = this.instalacionSeleccionada.id_transaccion;
    datos.cambioComprobante = this.cambioComprobante;

    datos.nombre_archivo_comprobante = this.instalacionSeleccionada.nombre_archivo_comprobante;
    datos.url_comprobante = this.instalacionSeleccionada.url_comprobante;
    console.log('se cambio comprobante:', this.cambioComprobante);
    

    if (this.cambioComprobante === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/comprobantes/instalaciones';

      console.log('subiendo archivo');
      

     await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(
        url => {
        datos.nombre_archivo_comprobante = nuevoNombreArchivo;
        datos.url_comprobante = url; 
        datos.nombre_archivo_comprobante_borrar = this.instalacionSeleccionada.nombre_archivo_comprobante;

        console.log(url);
       } 

      );//fin subida de archivo


    }
    
    console.log(datos);

    this.servicionInstalacion.modificarInstalacion(datos).subscribe(
      async (res) => {
        const result: any = res;
        console.log(result);

        await Swal.fire({
          title: 'Instalación modificada!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/administrador/transacciones-instalaciones/listar']);

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
    );


  }

  obtenerPlanes() {
    this.servicioPlanes.obtenerPlanes().subscribe(
      res => {
        console.log(res);
        const result: any = res;
        this.listaPlanes = result.planes
        setTimeout(() => {
          $('.selectpicker').selectpicker('render');
          $('#selectPlan').selectpicker('val', this.instalacionSeleccionada.id_plan);
        }, 200);
      },
      err => {
        console.log(err);
      }
    )
  }

}
