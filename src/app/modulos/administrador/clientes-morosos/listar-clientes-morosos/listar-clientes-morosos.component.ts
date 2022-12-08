import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReportesService } from 'src/app/servicios/reportes/reportes.service';
import { async } from '@angular/core/testing';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { saveAs } from 'file-saver';


declare var $: any;
declare var Swal: any;
declare var moment: any;

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { element } from 'protractor';

@Component({
  selector: 'app-listar-clientes-morosos',
  templateUrl: './listar-clientes-morosos.component.html',
  styleUrls: ['./listar-clientes-morosos.component.css']
})
export class ListarClientesMorososComponent implements OnInit, AfterViewInit {

  @ViewChild('filtroTexto') filtroTexto: ElementRef;
  @ViewChild('filtroEstado') filtroEstado: ElementRef;

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
    private servicioReportes: ReportesService
  ) { }

  ngOnInit(): void {
    this.mostrarMorosos();
    // let mes = moment(moment('7/2020', 'MM/YYYY').add(0 + 1, 'M').format('MM/YYYY'), 'MM/YYYY').locale('es').format('MMMM');
    // console.log('XXXXXXXXXXXXXXXXXXX :',mes);
    
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
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
        'Meses que adeuda': element.mesesQueAdeuda,
        'Moroso': element.moroso,
        'Dirección': element.direccion,
        'Último pago': element.ultimo_pago_formateado
      }
      datosExcel.push(transaccion);
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, 'Morosos' + EXCEL_EXTENSION);
    Swal.fire({
      icon: 'success',
      title: 'Archivo Creado!',
      text: 'Ahora puede visualizar el archivo en sus descargas',
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Entendido',
    });
  }

  async crearTxt() {

    const { value: nombreLista, dismiss } = await Swal.fire({
      title: 'Escriba el nombre de la lista',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Escriba el nombre de la lista'
        }
      }
    });

    if (dismiss) {
      return;
    }

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

    const morososTest = []

    for (let index = 0; index < this.rows.length; index++) {
      const element = this.rows[index];
      if (element.moroso === 'si') {
        morososTest.push({
          cliente: element.nombre_cliente.replace(/\s/g, ''),
          ip_asignada: element.ip_asignada
        });
      }
    };

    console.log('morosos: ');
    console.log(morososTest);
    

    let comandosMikrotik = `/ip firewall address-list remove [find where list=“${nombreLista}”];\n`;

    for (let index = 0; index < morososTest.length; index++) {
      const element = morososTest[index];
      console.log(element);
      
      comandosMikrotik = comandosMikrotik + `/ip firewall address-list add address=${element.ip_asignada} list="${nombreLista}" comment=“${element.cliente}”;\n`;
    }

    var blob = new Blob([comandosMikrotik], { type: "text/plain;charset=utf-8" });
    saveAs.saveAs(blob, `${nombreLista}.txt`);

    Swal.fire({
      icon: 'success',
      title: 'Archivo Creado!',
      text: 'Ahora puede visualizar el archivos en sus descargas',
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

    const cabecera = [['No.', 'Cliente', 'Meses que adeuda', 'Moroso', 'Dirección', 'Último pago']];

    let data:any = [];

    for (let index = 0; index < this.rows.length; index++) {
      const element = this.rows[index];
      data.push([
        // element.fila_numero,
        index+1,
        element.nombre_cliente,
        element.mesesQueAdeuda,
        element.moroso,
        element.direccion,
        element.ultimo_pago_formateado
      ])
    }

    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Morosos', 15, 20);

    (doc as any).autoTable({
      head: cabecera,
      body: data,
      theme: 'grid',
      startY: 30,
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
      title: "ReporteMorosos"
    });

    // Open PDF document in new tab
    // doc.output('dataurlnewwindow');

    // Download PDF document  
    doc.save('morosos.pdf');
    
    Swal.fire({
      icon: 'success',
      title: 'Archivo Creado!',
      text: 'Ahora puede visualizar el archivo en sus descargas',
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: 'Entendido',
    });

  }

  mostrarMorosos() {

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

    this.servicioReportes.mostrarMorosos().subscribe(
      res => {
        const result: any = res;

        for (let index = 0; index < result.morosos.length; index++) {
          console.log('-------- Iteracion -----------');
          const element = result.morosos[index];
          result.morosos[index].ultimo_pago_formateado = moment(result.morosos[index].ultimo_pago, 'MM/YYYY').locale('es').format('MMMM YYYY');
          console.log(element);
          
          if (element.moroso === 'si') {
            console.log('es moroso');
            
            let mesesQueAdeuda = '';
            const cantidadMeses = Number(moment(moment().format('MM/YYYY'), 'MM/YYYY').diff(moment(element.ultimo_pago, 'MM/YYYY'), 'months'));
            console.log('cantidad de meses:', cantidadMeses);
            for (let index2 = 0; index2 < cantidadMeses; index2++) {
              let mes;
              if (element.tiene_cobros === 'si') {
                console.log('tiene cobros:');
                
                mes = moment(moment(element.ultimo_pago, 'MM/YYYY').add(index2 + 1, 'M').format('MM/YYYY'), 'MM/YYYY').locale('es').format('MMMM');
              } else {
                console.log('no tiene cobros');
                result.morosos[index].ultimo_pago_formateado = 'Sin pagos registrados';
                mes = moment(moment(element.ultimo_pago, 'MM/YYYY').add(index2, 'M').format('MM/YYYY'), 'MM/YYYY').locale('es').format('MMMM');
              }
              console.log(`Mes: ${mes}`);

              if (index2 + 2 === cantidadMeses &&  element.tiene_cobros === 'si') {
                mesesQueAdeuda = mesesQueAdeuda + `${mes}`;
                break;
              }

              if (index2 + 1 === cantidadMeses &&  element.tiene_cobros === 'no') {
                mesesQueAdeuda = mesesQueAdeuda + `${mes}`;
                break;
              }

              mesesQueAdeuda = mesesQueAdeuda + `${mes}, `;

            }

            result.morosos[index].mesesQueAdeuda = mesesQueAdeuda;

          } else {
            console.log('No es moroso');
            result.morosos[index].mesesQueAdeuda = 'Ninguno';
          }

        }

        Swal.close();

        console.log(result.morosos);
        this.rows = result.morosos;
        this.temp = [...this.rows];

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


  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
    const val2 = this.filtroEstado.nativeElement.value.toLocaleLowerCase();

    let temp = this.temp;

    val1.map(element => {

      temp = temp.filter(function (index) {
        return (index.nombre_cliente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.mesesQueAdeuda.toLowerCase().indexOf(element) !== -1 ||
          index.moroso.toLowerCase().indexOf(element) !== -1 ||
          index.direccion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(element) !== -1 ||
          index.ultimo_pago_formateado.toLowerCase().indexOf(element) !== -1 ||
          !element);
      });

    });


    temp = temp.filter(function (index) {
      return (
        index.moroso.toLowerCase().indexOf(val2) !== -1 ||
        !val2
      );
    });

    // Actualiza las filas
    this.rows = temp;
    // Cuando se realiza un filtro la tabla regresa a la primera pagina
    this.table.offset = 0;

  }


}
