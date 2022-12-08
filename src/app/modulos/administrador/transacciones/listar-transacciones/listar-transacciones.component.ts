import { Component, OnInit, ViewChild, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { TransaccionesService } from 'src/app/servicios/transacciones/transacciones.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';

declare var $: any;
declare var Swal: any;
declare var moment: any;

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { jsPDF } from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-listar-transacciones',
  templateUrl: './listar-transacciones.component.html',
  styleUrls: ['./listar-transacciones.component.css']
})
export class ListarTransaccionesComponent implements OnInit, OnDestroy {

  // @ViewChild('fecha_venta') fechaDesde: ElementRef;
  // @ViewChild('fecha_venta') fechaHasta: ElementRef;
  @ViewChild('filtroTexto') filtroTexto: ElementRef;

  fechaDesde: any = moment().format('YYYY-MM-DD');
  fechaHasta: any = moment().format('YYYY-MM-DD');
  totalTransaccionesFiltradas = 0;

  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  rows = [];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;

  constructor(
    private servicioTransacciones: TransaccionesService,
    private router: Router,
    private ngZone: NgZone
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.cargarTransacciones();
    // this.configuracionDatePickers();
    this.configurarRangoFechas();
    console.log('fecha 1:', new Date);
    console.log('fecha 2:', moment().format('LL'));

  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  sumarTotal(items) {
    return items.reduce(function (a, b) {
      return a + Number(b['total_transaccion']);
    }, 0);
  };

  formatearCantidad(cantidad){
    return cantidad.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 

  }

  crearExcel() {

    Swal.fire({
      title: 'Procesando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datosExcel:any = [];
    
    for (let index = 0; index < this.rows.length; index++) {
      const element = this.rows[index];
      const transaccion = {
        'No.': index+1,
        'Cliente': element.nombre_cliente,
        'Tipo Transacción': element.tipo_transaccion,
        'Fecha Usuario': element.fecha_transaccion_usuario_formateada,
        'Fecha Sistema': element.fecha_transaccion_sistema_formateada,
        'Total Cobro': element.total_transaccion,
        'No. Factura': element.numero_factura,
        'No. Recibo': element.numero_recibo  
      }
      datosExcel.push(transaccion);
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const desde = moment(this.fechaDesde, 'YYYY-MM-DD').format('DD-MM-YYYY');
    const hasta = moment(this.fechaHasta, 'YYYY-MM-DD').format('DD-MM-YYYY');    

    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, 'transacciones ' + `Desde ${desde} hasta ${hasta}` + EXCEL_EXTENSION);
    Swal.fire({
      icon: 'success',
      title: 'Archivo Creado!',
      text: 'Ahora puede visualizar el archivo en sus descargas',
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Entendido',
    });
  }

  crearPdf() {

    Swal.fire({
      title: 'Procesando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const cabecera = [['No.', 'Cliente', 'Tipo Transacción', 'Fecha Usuario', 'Fecha Sistema', 'Total Cobro', 'No. Factura', 'No. Recibo']];
    
    let data:any = [];

    for (let index = 0; index < this.rows.length; index++) {
      const element = this.rows[index];
      data.push([
        // element.fila_numero,
        index+1,
        element.nombre_cliente,
        element.tipo_transaccion,
        element.fecha_transaccion_usuario_formateada,
        element.fecha_transaccion_sistema_formateada,
        element.total_transaccion,
        element.numero_factura,
        element.numero_recibo
      ])
    }

    // const data = this.rows.map(element => {

    //   return [
    //     element.fila_numero,
    //     element.nombre_cliente,
    //     element.tipo_transaccion,
    //     element.fecha_transaccion_usuario_formateada,
    //     element.fecha_transaccion_sistema_formateada,
    //     element.total_transaccion,
    //     element.numero_factura,
    //     element.numero_recibo
    //   ];

    // });

    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Transacciones', 15, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Realizadas de ${moment(this.fechaDesde, 'YYYY-MM-DD').format('DD/MM/YYYY')} a ${moment(this.fechaHasta, 'YYYY-MM-DD').format('DD/MM/YYYY')}`, 15, 28);
    doc.text('Total: Q' + this.formatearCantidad(this.totalTransaccionesFiltradas), 15, 35);


    (doc as any).autoTable({
      head: cabecera,
      body: data,
      theme: 'grid',
      startY: 40,
      didDrawCell: data => {
        // console.log(data.column.index)
      },
      didParseCell: function (table) {

        if (table.section === 'head') {
          table.cell.styles.fillColor = '#118DCD';
        }
      }
    });

    doc.setProperties({
      title: "ReporteTransacciones"
    });

    // Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // Download PDF document  
    doc.save('transacciones.pdf');
    Swal.fire({
      icon: 'success',
      title: 'Archivo Creado!',
      text: 'Ahora puede visualizar el archivo en sus descargas',
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Entendido',
    });

  }

  detalleTransaccion(transaccion) {
    this.servicioTransacciones.transaccionSeleccionada = transaccion;
    this.router.navigate(['/administrador/transacciones/detalles']);
  }

  cargarTransacciones() {

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

    const subscribeTransacciones = this.servicioTransacciones.obtenerTransacciones().subscribe(
      async (res) => {
        const result: any = res;
        console.log(result.transacciones);
        console.log('antes del error');

        if (result.transacciones.length > 0) {

          for (var i in result.transacciones) {
            result.transacciones[i].fecha_transaccion_usuario_formateada = moment(result.transacciones[i].fecha_transaccion_usuario).locale('es').format('LL');
            result.transacciones[i].fecha_transaccion_sistema_formateada = moment(result.transacciones[i].fecha_transaccion_sistema).locale('es').format('LL');
          }

          //Cambiamos la fecha inicial y la fecha final segun los que nos devuelva la consulta
          $('#rangoFechas').data('daterangepicker').setStartDate(moment(result.transacciones[Number(result.transacciones.length - 1)].fecha_transaccion_sistema));
          $('#rangoFechas').data('daterangepicker').setEndDate(moment(result.transacciones[0].fecha_transaccion_sistema));
          this.fechaDesde = moment(result.transacciones[Number(result.transacciones.length - 1)].fecha_transaccion_sistema).format('YYYY-MM-DD');
          this.fechaHasta = moment(result.transacciones[0].fecha_transaccion_sistema).format('YYYY-MM-DD');

        }

        this.rows = result.transacciones;
        this.temp = [...this.rows];

        this.totalTransaccionesFiltradas = this.sumarTotal(this.rows)

        Swal.close();
        subscribeTransacciones.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);

      },
      err => {
        console.log(err);
        subscribeTransacciones.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }


  configurarRangoFechas() {

    $('#rangoFechas').daterangepicker({
      opens: 'left',
      ranges: {
        'Hoy': [moment(), moment()],
        'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Ultimos 7 dias': [moment().subtract(6, 'days'), moment()],
        'Ultimos 30 dias': [moment().subtract(29, 'days'), moment()],
        'Este mes': [moment().startOf('month'), moment().endOf('month')],
        'Ultimo mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      locale: {
        "format": "LL",
        "separator": " A ",
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Rango Personalizado",
        "daysOfWeek": [
          "Dom",
          "Lun",
          "Mar",
          "Mie",
          "Jue",
          "Vie",
          "Sab"
        ],
        "monthNames": [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        "firstDay": 1
      }
    }, (start, end, label) => {
      // console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

      this.ngZone.run(() => {
        this.fechaDesde = moment(start).format('YYYY-MM-DD');
        this.fechaHasta = moment(end).format('YYYY-MM-DD');
      });

    });

  }

  filtrarDatos() {
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().split(' ');
    let temp = [];
    for (let index = 0; index < this.temp.length; index++) {
      const element = this.temp[index];
      const fecha = moment(element.fecha_transaccion_usuario).format('YYYY-MM-DD');
      if (moment(fecha).isBetween(this.fechaDesde, this.fechaHasta, 'days', '[]')) {
        temp.push(element);
      }
    }

    val1.map(element => {
      temp = temp.filter(function (index) {
        return (index.nombre_cliente.toLowerCase().indexOf(element) !== -1 ||
          index.tipo_transaccion.toLowerCase().indexOf(element) !== -1 ||
          index.total_transaccion.toLowerCase().indexOf(element) !== -1 ||
          index.numero_factura.toLowerCase().indexOf(element) !== -1 ||
          index.numero_recibo.toLowerCase().indexOf(element) !== -1 ||
          !element);
      });
    });

    this.rows = temp;
    this.totalTransaccionesFiltradas = this.sumarTotal(this.rows);
    this.table.offset = 0;

  }


}
