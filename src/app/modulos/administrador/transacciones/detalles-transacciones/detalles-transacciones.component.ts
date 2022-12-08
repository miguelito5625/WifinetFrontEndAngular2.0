import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from 'src/app/servicios/transacciones/transacciones.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-transacciones',
  templateUrl: './detalles-transacciones.component.html',
  styleUrls: ['./detalles-transacciones.component.css']
})
export class DetallesTransaccionesComponent implements OnInit {

  transaccionSeleccionada:any;

  formularioTransaccion = new FormGroup({
    cliente: new FormControl(''),
    tipo_transaccion: new FormControl(''),
    numero_factura: new FormControl(''),
    numero_recibo: new FormControl(''),
    fecha_sistema: new FormControl(''),
    fecha_usuario: new FormControl(''),
    tipo_pago: new FormControl(''),
    ajuste: new FormControl(''),
    subtotal: new FormControl(''),
    total: new FormControl(''),
    nombre_usuario: new FormControl(''),
    detalle: new FormControl('')
  });

  constructor(
    private servicioTransacciones: TransaccionesService,
    private router: Router
  ) { 

    if (!this.servicioTransacciones.transaccionSeleccionada) {
      this.router.navigate(['/administrador/transacciones/listar']);
      return;
    }

    console.log(this.servicioTransacciones.transaccionSeleccionada);
    this.transaccionSeleccionada = this.servicioTransacciones.transaccionSeleccionada;
    
  }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  llenarFormulario(){
    const total = Number(this.transaccionSeleccionada.total_transaccion) + Number(this.transaccionSeleccionada.ajuste);
    this.formularioTransaccion.controls.cliente.setValue(this.transaccionSeleccionada.nombre_cliente);
    this.formularioTransaccion.controls.tipo_transaccion.setValue(this.transaccionSeleccionada.tipo_transaccion);
    this.formularioTransaccion.controls.numero_factura.setValue(this.transaccionSeleccionada.numero_factura);
    this.formularioTransaccion.controls.numero_recibo.setValue(this.transaccionSeleccionada.numero_recibo);
    this.formularioTransaccion.controls.fecha_sistema.setValue(this.transaccionSeleccionada.fecha_transaccion_sistema_formateada);
    this.formularioTransaccion.controls.fecha_usuario.setValue(this.transaccionSeleccionada.fecha_transaccion_usuario_formateada);
    this.formularioTransaccion.controls.tipo_pago.setValue(this.transaccionSeleccionada.tipo_pago);
    this.formularioTransaccion.controls.ajuste.setValue(this.transaccionSeleccionada.ajuste);
    this.formularioTransaccion.controls.subtotal.setValue(this.transaccionSeleccionada.total_transaccion);
    this.formularioTransaccion.controls.total.setValue(total);
    this.formularioTransaccion.controls.nombre_usuario.setValue(this.transaccionSeleccionada.nombre_empleado);
    this.formularioTransaccion.controls.detalle.setValue(this.transaccionSeleccionada.detalle);
  }

}
