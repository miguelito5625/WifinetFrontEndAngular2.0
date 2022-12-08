import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { jsPDF } from "jspdf";
import 'jspdf-autotable';

declare var moment: any;
declare var Swal: any;



@Injectable({
  providedIn: 'root'
})
export class ArchivosRecibosService {

  constructor() { }

  animacionProcesando() {
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
  }


  crearReciboCobroMensualidad(cobro: any) {

    this.animacionProcesando();

    let doc = new jsPDF('p', 'mm', [104, 200]);
    doc.addImage("assets/images/recibos/cabecera.png", "PNG", 20, 10, 60, 15);

    doc.addFont('assets/fonts/Calibri.ttf', 'Calibri', 'normal');
    doc.setFont('Calibri');

    doc.setFontSize(12);
    doc.text("WIFINETWORKS COPROPIEDAD", 24, 35);
    //doc.text("Callejón Tejada, Barrio el Mitchal", 22, 40);
    doc.text("Soluciones Tecnológicas", 29, 40);
    doc.text("Tel. 4251-0307", 37, 45);


    doc.text("Datos de Recibo", 5, 55);
    doc.setFontSize(10);
    doc.text("No. De Recibo:", 5, 60);
    doc.setFontSize(14);
    doc.text(`${cobro.numero_recibo.toString().padStart(9, "0")}`, 45, 60);
    doc.setFontSize(10);
    doc.text("Fecha de Emisión:", 5, 65);
    doc.text(`${moment(cobro.fecha_transaccion_usuario).format('DD/MM/YYYY')}`, 45, 65);
    // doc.text("Emitido por:", 5, 70);
    // doc.text(`${cobro.nombre_empleado_NA}`, 45, 70);
    doc.text("Mes Pagado:", 5, 70);
    doc.text(`${cobro.mes_de_pago.charAt(0).toUpperCase() + cobro.mes_de_pago.slice(1)} - ${cobro.anio_de_pago}`, 45, 70);

    doc.setLineWidth(1)
    doc.line(5, 73, 90, 73)

    doc.setFontSize(12);
    doc.text("Datos del Cliente", 5, 80);
    doc.setFontSize(10);
    doc.text("Instalación:", 5, 85);
    doc.text(`INS_${cobro.id_cobro_mensualidad.toString().padStart(6, "0")}`, 45, 85);
    doc.text("Nombre:", 5, 90);
    doc.text(`${cobro.nombre_cliente_NA}`, 45, 90);
    doc.text("Dirección:", 5, 95);
    doc.text(`Bo. ${cobro.barrio}, ${cobro.municipio}`, 45, 95);

    doc.setLineWidth(1);
    doc.line(5, 98, 90, 98);

    // doc.setFontSize(12);
    // doc.text("Pago correspondiente a:", 5, 105);
    // doc.setFontSize(10);
    // doc.text("Mes:", 5, 110);
    // doc.text(`${cobro.mes_de_pago.charAt(0).toUpperCase() + cobro.mes_de_pago.slice(1)}`, 15, 110);
    // doc.text("Año:", 55, 110);
    // doc.text(`${cobro.anio_de_pago}`, 65, 110);


    doc.setFontSize(12);
    doc.text("Detalle del Recibo", 5, 105);
    doc.setFontSize(10);
    doc.text("Prod.", 5, 110);
    doc.text("Cant.", 30, 110);
    doc.text("V.Uni", 55, 110);
    doc.text("Total", 80, 110);
    doc.text(`Plan ${cobro.nombre_plan}`, 5, 115);
    doc.text("1", 30, 115);
    doc.text(`${cobro.subtotal}`, 55, 115);
    doc.text(`${cobro.subtotal}`, 80, 115);

    doc.text("________", 78, 120);
    doc.text("Subtotal", 5, 125);
    doc.text(`${cobro.subtotal}`, 80, 125);
    doc.text("Ajuste", 5, 130);
    doc.text(`${cobro.ajuste}`, 80, 130);
    doc.text("________", 78, 130);
    doc.text("Total", 5, 135);
    doc.text(`${cobro.total}`, 80, 135);
    doc.text("________", 78, 135);
    doc.text("________", 78, 136);

    var splitTitle = doc.splitTextToSize(`Observaciones: ${cobro.detalle}`, 85);
    doc.text(splitTitle, 5, 145);

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Recibo creado',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
      }).then(() => {

        // Descarga el archivo automticamente
        //doc.save(`cobro_${cobro.numero_recibo.toString().padStart(9, "0")}.pdf`);
        // doc.autoPrint();

        //Para abrir el archivo en una nueva pestaña
        const urlPdf: any = doc.output('bloburl');
        window.open(urlPdf, '_blank');

      });
    }, 1200);


  }


  crearReciboInstalacion(instalacion: any) {

    this.animacionProcesando();

    let doc = new jsPDF('p', 'mm', [104, 200]);
    doc.addImage("assets/images/recibos/cabecera.png", "PNG", 20, 10, 60, 15);

    doc.addFont('assets/fonts/Calibri.ttf', 'Calibri', 'normal');
    doc.setFont('Calibri');

    doc.setFontSize(12);
    doc.text("WIFINETWORKS COPROPIEDAD", 24, 35);
    doc.text("Soluciones Tecnológicas", 29, 40);
    doc.text("Tel. 4251-0307", 37, 45);


    doc.text("Datos de Recibo", 5, 55);
    doc.setFontSize(10);
    doc.text("No. De Recibo:", 5, 60);
    doc.setFontSize(14);
    doc.text(`${instalacion.numero_recibo.toString().padStart(9, "0")}`, 45, 60);
    doc.setFontSize(10);
    doc.text("Fecha de Emisión:", 5, 65);
    doc.text(`${moment(instalacion.fecha_alta).format('DD/MM/YYYY')}`, 45, 65);
    // doc.text("Emitido por:", 5, 70);
    // doc.text(`${instalacion.nombre_empleado_NA}`, 45, 70);

    doc.setLineWidth(1);
    doc.line(5, 73, 90, 73);

    doc.setFontSize(12);
    doc.text("Datos del Cliente", 5, 80);
    doc.setFontSize(10);
    doc.text("Instalación:", 5, 85);
    doc.text(`INS_${instalacion.id_instalacion.toString().padStart(6, "0")}`, 45, 85);
    doc.text("Nombre:", 5, 90);
    doc.text(`${instalacion.nombre_cliente_NA}`, 45, 90);
    doc.text("Dirección:", 5, 95);
    doc.text(`Bo. ${instalacion.barrio}, ${instalacion.municipio}`, 45, 95);

    doc.setLineWidth(1);
    doc.line(5, 98, 90, 98);

    doc.setFontSize(12);
    doc.text("Detalle del Recibo", 5, 105);
    doc.setFontSize(10);
    doc.text("Prod.", 5, 110);
    doc.text("Cant.", 30, 110);
    doc.text("V.Uni", 55, 110);
    doc.text("Total", 80, 110);
    doc.text("instalacion", 5, 115);
    doc.text("1", 30, 115);
    doc.text(`${instalacion.costo_instalacion}`, 55, 115);
    doc.text(`${instalacion.costo_instalacion}`, 80, 115);

    doc.text("________", 78, 125);
    doc.text("Subtotal", 5, 130);
    doc.text(`${instalacion.costo_instalacion}`, 80, 130);
    doc.text("Ajuste", 5, 135);
    doc.text(`${instalacion.ajuste}`, 80, 135);
    doc.text("________", 78, 135);
    doc.text("Total", 5, 140);
    doc.text(`${instalacion.total_transaccion}`, 80, 140);
    doc.text("________", 78, 140);
    doc.text("________", 78, 141);

    var splitTitle = doc.splitTextToSize(`Observaciones: ${instalacion.detalle}`, 85);
    doc.text(splitTitle, 5, 150);

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Recibo creado',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
      }).then(() => {

        // Descarga el archivo automticamente
        //doc.save(`instalacion_${instalacion.numero_recibo.toString().padStart(9, "0")}.pdf`);
        // doc.autoPrint();

        //Para abrir el archivo en una nueva pestaña
        const urlPdf: any = doc.output('bloburl');
        window.open(urlPdf, '_blank');

      });
    }, 1200);


  }



  crearReciboVentas(venta: any) {

    console.log('fecha cobro de venta');
    console.log(venta);

    this.animacionProcesando();

    let doc = new jsPDF('p', 'mm', [104, 200]);
    doc.addImage("assets/images/recibos/cabecera.png", "PNG", 20, 10, 60, 15);

    doc.addFont('assets/fonts/Calibri.ttf', 'Calibri', 'normal');
    doc.setFont('Calibri');

    doc.setFontSize(12);
    doc.text("WIFINETWORKS COPROPIEDAD", 24, 35);
    doc.text("Soluciones Tecnológicas", 29, 40);
    doc.text("Tel. 4251-0307", 37, 45);


    doc.text("Datos de Recibo", 5, 55);
    doc.setFontSize(10);
    doc.text("No. De Recibo:", 5, 60);
    doc.setFontSize(14);
    doc.text(`${venta.numero_recibo.toString().padStart(9, "0")}`, 45, 60);
    doc.setFontSize(10);
    doc.text("Fecha de Emisión:", 5, 65);
    doc.text(`${moment(venta.fecha_transaccion_usuario).format('DD/MM/YYYY')}`, 45, 65);
    // doc.text("Emitido por:", 5, 70);
    // doc.text(`${venta.nombre_empleado_NA}`, 45, 70);

    doc.setLineWidth(1);
    doc.line(5, 73, 90, 73);

    doc.setFontSize(12);
    doc.text("Datos del Cliente", 5, 80);
    doc.setFontSize(10);
    // doc.text("Instalación:", 5, 85);
    // doc.text("INS_000025", 45, 85);
    doc.text("Nombre:", 5, 85);
    doc.text(`${venta.nombre_cliente_NA}`, 45, 85);
    doc.text("Dirección:", 5, 90);
    doc.text(`Bo. ${venta.barrio_cliente}, ${venta.municipio_cliente}`, 45, 90);

    doc.setLineWidth(1);
    doc.line(5, 98, 90, 98);

    doc.setFontSize(12);
    doc.text("Detalle del Recibo", 5, 100);
    doc.setFontSize(10);
    doc.text("Prod.", 5, 105);
    doc.text("Cant.", 30, 105);
    doc.text("V.Uni", 55, 105);
    doc.text("Total", 80, 105);
    doc.text("Venta", 5, 110);
    doc.text("1", 30, 110);
    doc.text(`${venta.total_venta}`, 55, 110);
    doc.text(`${venta.total_venta}`, 80, 110);

    doc.text("________", 78, 120);
    doc.text("Subtotal", 5, 125);
    doc.text(`${venta.total_venta}`, 80, 125);
    doc.text("Ajuste", 5, 130);
    doc.text(`${venta.ajuste}`, 80, 130);
    doc.text("________", 78, 130);
    doc.text("Total", 5, 135);
    doc.text(`${venta.total_transaccion}`, 80, 135);
    doc.text("________", 78, 135);
    doc.text("________", 78, 136);

    var splitTitle = doc.splitTextToSize(`Observaciones: ${venta.detalle}`, 85);
    doc.text(splitTitle, 5, 145);

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Recibo creado',
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
      }).then(() => {

        // Descarga el archivo automticamente
        //doc.save(`venta_${venta.numero_recibo.toString().padStart(9, "0")}.pdf`);
        // doc.autoPrint();

        //Para abrir el archivo en una nueva pestaña
        const urlPdf: any = doc.output('bloburl');
        window.open(urlPdf, '_blank');

      });
    }, 1200);


  }



}
