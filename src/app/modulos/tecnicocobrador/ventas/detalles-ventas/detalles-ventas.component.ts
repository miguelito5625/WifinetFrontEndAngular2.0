import { Component, OnInit, OnDestroy } from '@angular/core';
import { VentasService } from 'src/app/servicios/ventas/ventas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-ventas',
  templateUrl: './detalles-ventas.component.html',
  styleUrls: ['./detalles-ventas.component.css']
})
export class DetallesVentasComponent implements OnInit, OnDestroy {

  ventaSeleccionada:any;

  formularioVenta = new FormGroup({
    nombre_cliente: new FormControl(''),
    fecha_transaccion_sistema: new FormControl(''),
    fecha_transaccion_usuario: new FormControl(''),
    total_venta: new FormControl(''),
    ajuste: new FormControl(''),
    total_ajuste: new FormControl(''),
    numero_factura: new FormControl(''),
    numero_recibo: new FormControl(''),
    tipo_pago: new FormControl(''),
    detalle: new FormControl('')
  });

  

  constructor(
    private servicioVentas: VentasService,
    private router: Router
  ) {
    if (!this.servicioVentas.ventaSeleccionada) {
      this.router.navigate(['/administrador/ventas/listar']);
      return;
    }

    this.ventaSeleccionada = this.servicioVentas.ventaSeleccionada;
    
   }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  ngOnDestroy(){
    this.servicioVentas.ventaSeleccionada = null;
  }

  llenarFormulario(){
    const total = Number(this.ventaSeleccionada.total_venta) + Number(this.ventaSeleccionada.ajuste);
    this.formularioVenta.controls.nombre_cliente.setValue(this.ventaSeleccionada.nombre_cliente);
    this.formularioVenta.controls.fecha_transaccion_sistema.setValue(this.ventaSeleccionada.fecha_transaccion_sistema_formateada);
    this.formularioVenta.controls.fecha_transaccion_usuario.setValue(this.ventaSeleccionada.fecha_transaccion_usuario_formateada);
    this.formularioVenta.controls.total_venta.setValue(this.ventaSeleccionada.total_venta);
    this.formularioVenta.controls.ajuste.setValue(this.ventaSeleccionada.ajuste);
    this.formularioVenta.controls.total_ajuste.setValue(total);
    this.formularioVenta.controls.numero_factura.setValue(this.ventaSeleccionada.numero_factura);
    this.formularioVenta.controls.numero_recibo.setValue(this.ventaSeleccionada.numero_recibo);
    this.formularioVenta.controls.tipo_pago.setValue(this.ventaSeleccionada.tipo_pago);
    this.formularioVenta.controls.detalle.setValue(this.ventaSeleccionada.detalle);
    
  }

}
