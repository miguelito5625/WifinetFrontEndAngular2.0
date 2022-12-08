import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { CrearVentasComponent } from './crear-ventas/crear-ventas.component';
import { NavegacionVentasComponent } from './navegacion-ventas/navegacion-ventas.component';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";
import { DetallesVentaComponent } from './detalles-venta/detalles-venta.component';
import { ModificarVentaComponent } from './modificar-venta/modificar-venta.component';



@NgModule({
  declarations: [VentasComponent, ListarVentasComponent, CrearVentasComponent, NavegacionVentasComponent, DetallesVentaComponent, ModificarVentaComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }
