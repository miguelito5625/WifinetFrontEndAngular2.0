import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostoTransaccionesRoutingModule } from './costo-transacciones-routing.module';
import { CostoTransaccionesComponent } from './costo-transacciones.component';
import { ListarCostoTransaccionesComponent } from './listar-costo-transacciones/listar-costo-transacciones.component';
import { CrearCostoTransaccionesComponent } from './crear-costo-transacciones/crear-costo-transacciones.component';
import { NavegacionCostoTransaccionesComponent } from './navegacion-costo-transacciones/navegacion-costo-transacciones.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DetallesCostoTransaccionesComponent } from './detalles-costo-transacciones/detalles-costo-transacciones.component';



@NgModule({
  declarations: [CostoTransaccionesComponent, ListarCostoTransaccionesComponent, CrearCostoTransaccionesComponent, NavegacionCostoTransaccionesComponent, DetallesCostoTransaccionesComponent],
  imports: [
    CommonModule,
    CostoTransaccionesRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class CostoTransaccionesModule { }
