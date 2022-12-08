import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesComponent } from './transacciones.component';
import { NavegacionTransaccionesComponent } from './navegacion-transacciones/navegacion-transacciones.component';
import { ListarTransaccionesComponent } from './listar-transacciones/listar-transacciones.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";
import { DetallesTransaccionesComponent } from './detalles-transacciones/detalles-transacciones.component';


@NgModule({
  declarations: [TransaccionesComponent, NavegacionTransaccionesComponent, ListarTransaccionesComponent, DetallesTransaccionesComponent],
  imports: [
    CommonModule,
    TransaccionesRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class TransaccionesModule { }
