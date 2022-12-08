import { Component, OnInit, OnDestroy } from '@angular/core';
import { CobrosService } from 'src/app/servicios/cobros/cobros.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalles-cobros',
  templateUrl: './detalles-cobros.component.html',
  styleUrls: ['./detalles-cobros.component.css']
})
export class DetallesCobrosComponent implements OnInit, OnDestroy {

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
    tipo_pago: new FormControl(''),
    direccion_instalacion: new FormControl(''),
    nombre_plan: new FormControl(''),
    fecha_transaccion_usuario: new FormControl(''),
    fecha_transaccion_sistema: new FormControl('')
  });


  llenarFormulario(){
    this.formularioCobro.controls.nombre_cliente.setValue(this.servicioCobros.cobroSeleccionado.nombre_cliente);
    this.formularioCobro.controls.direccion_instalacion.setValue(this.servicioCobros.cobroSeleccionado.direccion_instalacion);
    this.formularioCobro.controls.nombre_plan.setValue(this.servicioCobros.cobroSeleccionado.nombre_plan);
    this.formularioCobro.controls.mes_de_pago.setValue(this.servicioCobros.cobroSeleccionado.mes_de_pago);
    this.formularioCobro.controls.anio_de_pago.setValue(this.servicioCobros.cobroSeleccionado.anio_de_pago);
    this.formularioCobro.controls.fecha_transaccion_usuario.setValue(this.servicioCobros.cobroSeleccionado.fecha_transaccion_usuario_formateada);
    this.formularioCobro.controls.fecha_transaccion_sistema.setValue(this.servicioCobros.cobroSeleccionado.fecha_transaccion_sistema_formateada);
    this.formularioCobro.controls.subTotal.setValue(Number(this.servicioCobros.cobroSeleccionado.total) - Number(this.servicioCobros.cobroSeleccionado.ajuste));
    this.formularioCobro.controls.ajuste.setValue(Number(this.servicioCobros.cobroSeleccionado.ajuste));
    this.formularioCobro.controls.totalAPagar.setValue(this.servicioCobros.cobroSeleccionado.total);
    this.formularioCobro.controls.numeroFactura.setValue(this.servicioCobros.cobroSeleccionado.numero_factura);
    this.formularioCobro.controls.numeroRecibo.setValue(this.servicioCobros.cobroSeleccionado.numero_recibo);
    this.formularioCobro.controls.tipo_pago.setValue(this.servicioCobros.cobroSeleccionado.tipo_pago);
    this.formularioCobro.controls.detalle.setValue(this.servicioCobros.cobroSeleccionado.detalle);


  }

  constructor(
    private servicioCobros: CobrosService,
    private router: Router
  ) { 

    if (!this.servicioCobros.cobroSeleccionado) {
      this.router.navigate(['/administrador/cobros/listar']);
      return;
    }

    console.log(this.servicioCobros.cobroSeleccionado);
    
  }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  ngOnDestroy(){
    this.servicioCobros.cobroSeleccionado = null;
  }

}
