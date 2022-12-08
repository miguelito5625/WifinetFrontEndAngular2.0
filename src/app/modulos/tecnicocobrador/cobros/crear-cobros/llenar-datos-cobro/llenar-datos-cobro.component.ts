import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { CobrosService } from 'src/app/servicios/cobros/cobros.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/servicios/firebase/firebase-storage.service';
import * as uuid from 'uuid';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';


declare var $: any;
declare var Swal: any;
declare var moment: any;

@Component({
  selector: 'app-llenar-datos-cobro',
  templateUrl: './llenar-datos-cobro.component.html',
  styleUrls: ['./llenar-datos-cobro.component.css']
})
export class LlenarDatosCobroComponent implements OnInit, AfterViewInit, OnDestroy {

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


  nombreCliente: string;
  // fechaCobro: any;
  // subTotal: any; //Total del costo del plan
  // ajuste: number;
  // totalAPagar: number;
  // numeroFactura: number;
  // detalle: string;
  direccionCliente:string;
  nombrePlan:string;

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
    private servicioInstalaciones: TransaccionesInstalacionesService,
    private servicioClientes: ClientesService,
    private servicioCobros: CobrosService,
    private servicioCostosTransacciones: CostoTransaccionesService,
    private router: Router,
    private firebaseStorage: FirebaseStorageService,
    private servicioAutenticacion: AutenticacionService
  ) {
    // console.log(this.servicioInstalaciones.instalacionSeleccionada);
    // console.log(this.servicioClientes.clienteSeleccionado);
    // console.log(this.servicioCobros.primerPago);

    if (!this.servicioClientes.clienteSeleccionado) {
      this.router.navigate(['/tecnicocobrador/cobros/listar']);
      return;
    }

    this.nombreCliente = this.servicioClientes.clienteSeleccionado.primer_nombre + ' ' +
      this.servicioClientes.clienteSeleccionado.segundo_nombre + ' ' +
      this.servicioClientes.clienteSeleccionado.primer_apellido + ' ' +
      this.servicioClientes.clienteSeleccionado.segundo_apellido;

      this.direccionCliente = this.servicioInstalaciones.instalacionSeleccionada.especificacion_direccion + ', ' +
                              this.servicioInstalaciones.instalacionSeleccionada.barrio + ', ' +
                              this.servicioInstalaciones.instalacionSeleccionada.municipio + ', ' +
                              this.servicioInstalaciones.instalacionSeleccionada.departamento;

      this.nombrePlan = this.servicioInstalaciones.instalacionSeleccionada.nombre_plan;
  }

  ngOnInit(): void {
    this.configuracionDatePickers();
    this.logicaDelCobro();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('refresh');

    $('.form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn').click(function () {
      $(this).parent().parent().find('.inputFileHidden').trigger('click');
      $(this).parent().parent().addClass('is-focused');
    });
  }

  ngOnDestroy() {
    this.servicioClientes.clienteSeleccionado = null;
    this.servicioInstalaciones.instalacionSeleccionada = null;
    this.servicioCobros.cantidadReferencias = null;
    this.servicioCobros.cobroSeleccionado = null;
    this.servicioCobros.id_ultima_referencia = null;
    this.servicioCobros.primerPago = null;
    this.servicioCobros.tieneReferencias = null;
  }


  logicaDelCobro() {
    this.formularioCobro.controls.nombre_cliente.setValue(this.nombreCliente);
    this.formularioCobro.controls.direccion_cliente.setValue(this.direccionCliente);
    this.formularioCobro.controls.nombre_plan.setValue(this.nombrePlan);
    if (this.servicioCobros.primerPago === 'si') { //Es primer pago
      console.log('Es primer pago');

      if (this.servicioInstalaciones.instalacionSeleccionada.primer_mes_gratis === 'si') {//es primer pago y tiene primer mes gratis

        console.log('tiene primer mes gratis');


        Swal.fire({
          title: 'Primer mes gratis',
          text: 'Esta instalación aplica para primer mes gratis',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });

        const mesACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('MMMM');
        const anioACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('YYYY');


        this.formularioCobro.controls.detalle.setValue('Se realiza el cobro a cero porque la instalación aplica para primer mes gratis');
        this.formularioCobro.controls.mes_de_pago.setValue(mesACancelar);
        this.formularioCobro.controls.anio_de_pago.setValue(anioACancelar);
        this.formularioCobro.controls.subTotal.setValue(this.servicioCobros.precioPlan);
        this.formularioCobro.controls.ajuste.setValue(Number(this.servicioCobros.precioPlan)*-1);
        this.formularioCobro.controls.totalAPagar.setValue(0);

      } else { // es primer pago y no tiene primer mes gratis
        console.log('no tiene primer mes gratis');


        const diasDelMes = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).daysInMonth();
        console.log('dias del mes: ', diasDelMes);
        const diaInstalacion = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).format('DD');
        console.log('dia de la instalacion:', diaInstalacion);
        const diasAPagar = Number(diasDelMes) - Number(diaInstalacion);
        console.log('Diferencia de dias:', diasAPagar);

        const precioPlanDividido = Number(this.servicioCobros.precioPlan) / Number(diasDelMes);
        const precioAPagar = Math.ceil(Number(precioPlanDividido) * Number(diasAPagar));
        console.log('el precio a pagar es:', precioAPagar.toFixed(2));

        const mesACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('MMMM');
        const anioACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('YYYY');

        this.formularioCobro.controls.mes_de_pago.setValue(mesACancelar);
        this.formularioCobro.controls.anio_de_pago.setValue(anioACancelar);
        this.formularioCobro.controls.subTotal.setValue(precioAPagar.toFixed(2));
        this.formularioCobro.controls.ajuste.setValue(0);
        this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(precioAPagar).toFixed(2));



      }

    } else { //No es primer pago
      console.log('no es primer pago');


      if (this.servicioInstalaciones.instalacionSeleccionada.primer_mes_gratis === 'si') {//no es primer pago y tiene primer mes gratis

        console.log('tiene primer mes gratis');

        if (this.servicioCobros.cantidadDePagos >= 2) { //no es primer pago y tiene mes gratis pero ya tiene dos pagos o mas

          console.log('este es el tercer pago o mayor');
          

          if (this.servicioCobros.ultimoPago.mes_de_pago === 'diciembre') {
            this.servicioCobros.ultimoPago.mes_de_pago = 'december'
          }
          if (this.servicioCobros.ultimoPago.mes_de_pago === 'enero') {
            this.servicioCobros.ultimoPago.mes_de_pago = 'january'
          }
          if (this.servicioCobros.ultimoPago.mes_de_pago === 'abril') {
            this.servicioCobros.ultimoPago.mes_de_pago = 'april'
          }
          if (this.servicioCobros.ultimoPago.mes_de_pago === 'agosto') {
            this.servicioCobros.ultimoPago.mes_de_pago = 'august'
          }


          const mesAnioAPagar: string = moment(this.servicioCobros.ultimoPago.mes_de_pago + ' ' + this.servicioCobros.ultimoPago.anio_de_pago, 'MMMM YYYY')
            .add('1', 'M')
            .locale('es')
            .format('MMMM YYYY');

          const mesAnioArray = mesAnioAPagar.split(' ');

          // this.formularioCobro.controls.mes_de_pago.setValue(mesAnioArray[0]);
          // this.formularioCobro.controls.anio_de_pago.setValue(mesAnioArray[1]);
          // this.formularioCobro.controls.subTotal.setValue(this.servicioCobros.precioPlan);
          // this.formularioCobro.controls.ajuste.setValue(0);
          // this.formularioCobro.controls.totalAPagar.setValue(this.servicioCobros.precioPlan);

          if (this.servicioCobros.tieneReferencias === 'si') { // no es primer pago y no tiene primer mes gratis, pero tiene referencias

            console.log('tiene referencias');
  
            
            // const mesACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('MMMM');
            // const anioACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('YYYY');
  
  
            this.formularioCobro.controls.mes_de_pago.setValue(mesAnioArray[0]);
            this.formularioCobro.controls.anio_de_pago.setValue(mesAnioArray[1]);
            this.formularioCobro.controls.subTotal.setValue(this.servicioCobros.precioPlan);
            this.formularioCobro.controls.ajuste.setValue(Number(this.servicioCostosTransacciones.descuentoPorReferenciaVigente * -1).toFixed(2));
            const totalAPagar = Number(this.servicioCobros.precioPlan) - Number(this.servicioCostosTransacciones.descuentoPorReferenciaVigente);
            this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(totalAPagar).toFixed(2));
  
            const nombreClienteReferido = this.servicioCobros.nombre_cliente_referido;
  
            this.formularioCobro.controls.detalle.setValue(`se descuentan Q${this.servicioCostosTransacciones.descuentoPorReferenciaVigente} por haber referido a ${nombreClienteReferido}`);
  
            Swal.fire({
              title: 'Tiene referencias',
              text: `se descuentan Q${this.servicioCostosTransacciones.descuentoPorReferenciaVigente} por haber referido a ${nombreClienteReferido}`,
              icon: 'info',
              confirmButtonText: 'Aceptar'
            });

          } else { //  no es primer pago y no tiene primer mes gratis y no tiene referencias
  
            console.log('no tiene referencias');
  
  
            // const mesACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('MMMM');
            // const anioACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('YYYY');
  
  
            this.formularioCobro.controls.mes_de_pago.setValue(mesAnioArray[0]);
            this.formularioCobro.controls.anio_de_pago.setValue(mesAnioArray[1]);
            this.formularioCobro.controls.subTotal.setValue(this.servicioCobros.precioPlan);
            this.formularioCobro.controls.ajuste.setValue(0);
            this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(Number(this.servicioCobros.precioPlan)).toFixed(2));
  
          }



        } else {//es el segundo pago y tiene mes gratis
          console.log('es segundo pago');
          
          this.servicioCobros.tieneReferencias = 'no';

          const fechaMesDespues = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).add(1, 'M').format();
          console.log('la fecha 1 mes despues es:');
          console.log(fechaMesDespues);

          const diasDelMes = moment(fechaMesDespues).daysInMonth();
          console.log('dias del mes: ', diasDelMes);
          const diaInstalacion = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).format('DD');
          console.log('dia de la instalacion:', diaInstalacion);
          const diasAPagar = Number(diasDelMes) - Number(diaInstalacion);
          console.log('Diferencia de dias:', diasAPagar);

          const precioPlanDividido = Number(this.servicioCobros.precioPlan) / Number(diasDelMes);
          const precioAPagar = Number(precioPlanDividido) * Number(diasAPagar);
          console.log('el precio a pagar es:', precioAPagar.toFixed(2));

          const mesACancelar = moment(fechaMesDespues).locale('es').format('MMMM');
          const anioACancelar = moment(fechaMesDespues).locale('es').format('YYYY');


          this.formularioCobro.controls.mes_de_pago.setValue(mesACancelar);
          this.formularioCobro.controls.anio_de_pago.setValue(anioACancelar);
          this.formularioCobro.controls.subTotal.setValue(precioAPagar.toFixed(2));
          this.formularioCobro.controls.ajuste.setValue(0);
          this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(precioAPagar).toFixed(2));

        }




      } else {// no es primer pago y no tiene primer mes gratis
        console.log('no tiene primer mes gratis');

        // console.log('el ultimo mes de pago fue:');
        // console.log(this.servicioCobros.ultimoPago);

        if (this.servicioCobros.ultimoPago.mes_de_pago === 'diciembre') {
          this.servicioCobros.ultimoPago.mes_de_pago = 'december'
        }
        if (this.servicioCobros.ultimoPago.mes_de_pago === 'enero') {
          this.servicioCobros.ultimoPago.mes_de_pago = 'january'
        }
        if (this.servicioCobros.ultimoPago.mes_de_pago === 'abril') {
          this.servicioCobros.ultimoPago.mes_de_pago = 'april'
        }
        if (this.servicioCobros.ultimoPago.mes_de_pago === 'agosto') {
          this.servicioCobros.ultimoPago.mes_de_pago = 'august'
        }


        const mesAnioAPagar: string = moment(this.servicioCobros.ultimoPago.mes_de_pago + ' ' + this.servicioCobros.ultimoPago.anio_de_pago, 'MMMM YYYY')
          .add('1', 'M')
          .locale('es')
          .format('MMMM YYYY');

        const mesAnioArray = mesAnioAPagar.split(' ');




        if (this.servicioCobros.tieneReferencias === 'si') { // no es primer pago y no tiene primer mes gratis, pero tiene referencias

          console.log('tiene referencias');


          // const mesACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('MMMM');
          // const anioACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('YYYY');


          this.formularioCobro.controls.mes_de_pago.setValue(mesAnioArray[0]);
          this.formularioCobro.controls.anio_de_pago.setValue(mesAnioArray[1]);
          this.formularioCobro.controls.subTotal.setValue(this.servicioCobros.precioPlan);
          this.formularioCobro.controls.ajuste.setValue(Number(this.servicioCostosTransacciones.descuentoPorReferenciaVigente * -1).toFixed(2));
          const totalAPagar = Number(this.servicioCobros.precioPlan) - Number(this.servicioCostosTransacciones.descuentoPorReferenciaVigente);
          this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(totalAPagar).toFixed(2));

          const nombreClienteReferido = this.servicioCobros.nombre_cliente_referido;

          Swal.fire({
            title: 'Tiene referencias',
            text: `se descuentan Q${this.servicioCostosTransacciones.descuentoPorReferenciaVigente} por haber referido a ${nombreClienteReferido}`,
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });

          this.formularioCobro.controls.detalle.setValue(`se descuentan Q${this.servicioCostosTransacciones.descuentoPorReferenciaVigente} por haber referido a ${nombreClienteReferido}`);

        } else { //  no es primer pago y no tiene primer mes gratis y no tiene referencias

          console.log('no tiene referencias');


          // const mesACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('MMMM');
          // const anioACancelar = moment(this.servicioInstalaciones.instalacionSeleccionada.fecha_alta).locale('es').format('YYYY');


          this.formularioCobro.controls.mes_de_pago.setValue(mesAnioArray[0]);
          this.formularioCobro.controls.anio_de_pago.setValue(mesAnioArray[1]);
          this.formularioCobro.controls.subTotal.setValue(this.servicioCobros.precioPlan);
          this.formularioCobro.controls.ajuste.setValue(0);
          this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(Number(this.servicioCobros.precioPlan)).toFixed(2));

        }


      }

    }


  }

 async onSubmit() {

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

    const tipo_pago = this.formularioCobro.controls.tipo_pago.value;

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

    let datos:any = {
      mes_de_pago: this.formularioCobro.controls.mes_de_pago.value.toLowerCase(),
      anio_de_pago: this.formularioCobro.controls.anio_de_pago.value,
      id_instalacion: this.servicioInstalaciones.instalacionSeleccionada.id_instalacion,
      fecha_transaccion_usuario: moment(this.fecha_transaccion_usuario.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD"),
      ajuste: this.formularioCobro.controls.ajuste.value,
      tipo_pago: this.formularioCobro.controls.tipo_pago.value,
      detalle: this.formularioCobro.controls.detalle.value,
      total: this.formularioCobro.controls.totalAPagar.value,
      numero_factura: this.formularioCobro.controls.numeroFactura.value,
      numero_recibo: this.formularioCobro.controls.numeroRecibo.value,
      //cuando se trabajen las sesiones agregar el id usuario aqui
      id_usuario: this.servicioAutenticacion.usuarioLogueado.id_usuario,
      id_cliente: this.servicioClientes.clienteSeleccionado.id_cliente,
      tieneReferencias: this.servicioCobros.tieneReferencias,
      id_referencia: this.servicioCobros.id_ultima_referencia
    }

    if (this.cambioComprobante === 'si') {

      const archivo = this.fileToUpload;
      const nombreArchivo: string = this.labelImport.nativeElement.value;
      const extensionArchivo = nombreArchivo.split('.').pop();
      var fechaActual = moment().locale('es').format('DD-MMMM-YYYY');
      const nuevoNombreArchivo = `${fechaActual}-${uuid.v4()}.${extensionArchivo}`;
      const directorio = '/wifinet/comprobantes/cobrosDeMensualidad';

      await this.firebaseStorage.subirArchivo(directorio, nuevoNombreArchivo, archivo).then(url => {
        datos.nombre_archivo_comprobante = nuevoNombreArchivo;
        datos.url_comprobante = url;

      });//fin subida de archivo

    }

    console.log(datos);

    const descuentoPorReferenciaVigente = Number(this.servicioCostosTransacciones.descuentoPorReferenciaVigente);
    const ajuste = Number(this.formularioCobro.controls.ajuste.value * -1);

    console.log('el ajuste es:', ajuste);
    console.log('el descuento es:', descuentoPorReferenciaVigente);

    if (Number(ajuste) >= Number(descuentoPorReferenciaVigente)) {
      datos.utilizarReferencia = 'si';
    } else {
      datos.utilizarReferencia = 'no';
    }
    // console.log('datos: ');
    // console.log(datos);
    
    this.servicioCobros.crearCobro(datos).subscribe(
      async (res) => {
        const result: any = res;
        console.log(result);

        await Swal.fire({
          title: 'Creado!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/tecnicocobrador/cobros/listar']);

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


  onKeyUpAjuste() {
    const precio_instalacion = this.formularioCobro.controls.subTotal.value;
    let ajuste = this.formularioCobro.controls.ajuste.value;
    let total: number = 0;

    if (isNaN(ajuste) || ajuste === '') {// ajuste no es un numero
      ajuste = 0;
    }

    total = parseFloat(precio_instalacion) + parseFloat(ajuste);
    this.formularioCobro.controls.totalAPagar.setValue(Math.ceil(total).toFixed(2));

  }

  configuracionDatePickers() {

    $('#idfecha_transaccion_usuario').datetimepicker({
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
