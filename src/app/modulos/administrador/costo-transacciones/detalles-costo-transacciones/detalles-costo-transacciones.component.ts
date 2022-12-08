import { Component, OnInit } from '@angular/core';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

declare var moment:any;

@Component({
  selector: 'app-detalles-costo-transacciones',
  templateUrl: './detalles-costo-transacciones.component.html',
  styleUrls: ['./detalles-costo-transacciones.component.css']
})
export class DetallesCostoTransaccionesComponent implements OnInit {

  costoTransaccionSeleccionado:any;

  formularioCostoTransaccion = new FormGroup({
    tipo_transaccion: new FormControl(''),
    nombre_plan: new FormControl(''),
    costo: new FormControl(''),
    fecha_inicio: new FormControl(''),
    fecha_fin: new FormControl(''),
    estado: new FormControl('')
  });

  constructor(
    private servicioCostoTransacciones: CostoTransaccionesService,
    private router: Router
  ) {
    if (!this.servicioCostoTransacciones.costoTransaccionSeleccionado) {
      router.navigate(['/administrador/costo-transacciones/listar']);
      return;
    }

    this.costoTransaccionSeleccionado = this.servicioCostoTransacciones.costoTransaccionSeleccionado;
    console.log(this.costoTransaccionSeleccionado);

  }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  llenarFormulario(){

    let fecha_inicio = this.costoTransaccionSeleccionado.fecha_inicio;
    fecha_inicio = fecha_inicio?moment(this.costoTransaccionSeleccionado.fecha_inicio).locale('es').format('LL'):'';
    let fecha_fin = this.costoTransaccionSeleccionado.fecha_fin;
    fecha_fin = fecha_fin?moment(this.costoTransaccionSeleccionado.fecha_fin).locale('es').format('LL'):'';

    

    this.formularioCostoTransaccion.controls.tipo_transaccion.setValue(this.costoTransaccionSeleccionado.tipo_transaccion);
    this.formularioCostoTransaccion.controls.nombre_plan.setValue(this.costoTransaccionSeleccionado.nombre_plan);
    this.formularioCostoTransaccion.controls.costo.setValue(this.costoTransaccionSeleccionado.costo);
    this.formularioCostoTransaccion.controls.fecha_inicio.setValue(fecha_inicio);
    this.formularioCostoTransaccion.controls.fecha_fin.setValue(fecha_fin);
    this.formularioCostoTransaccion.controls.estado.setValue(this.costoTransaccionSeleccionado.estado);
    
  }

}
