import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarriosRoutingModule } from './barrios-routing.module';
import { BarriosComponent } from './barrios.component';
import { ListarBarriosComponent } from './listar-barrios/listar-barrios.component';
import { CrearBarriosComponent } from './crear-barrios/crear-barrios.component';
import { ModificarBarriosComponent } from './modificar-barrios/modificar-barrios.component';
import { NavegacionBarriosComponent } from './navegacion-barrios/navegacion-barrios.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [BarriosComponent, ListarBarriosComponent, CrearBarriosComponent, ModificarBarriosComponent, NavegacionBarriosComponent],
  imports: [
    CommonModule,
    BarriosRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class BarriosModule { }
