import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CobrosRoutingModule } from './cobros-routing.module';
import { CobrosComponent } from './cobros.component';
import { ListarCobrosComponent } from './listar-cobros/listar-cobros.component';
import { CrearCobrosComponent } from './crear-cobros/crear-cobros.component';
import { DetalleCobrosComponent } from './detalle-cobros/detalle-cobros.component';
import { ModificarCobrosComponent } from './modificar-cobros/modificar-cobros.component';
import { SeleccionarClienteCobroComponent } from './crear-cobros/seleccionar-cliente-cobro/seleccionar-cliente-cobro.component';
import { SeleccionarInstalacionCobroComponent } from './crear-cobros/seleccionar-instalacion-cobro/seleccionar-instalacion-cobro.component';
import { NavegacionCobrosComponent } from './navegacion-cobros/navegacion-cobros.component';
import { LlenarDatosCobroComponent } from './crear-cobros/llenar-datos-cobro/llenar-datos-cobro.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [CobrosComponent, ListarCobrosComponent, CrearCobrosComponent, DetalleCobrosComponent, ModificarCobrosComponent, SeleccionarClienteCobroComponent, SeleccionarInstalacionCobroComponent, NavegacionCobrosComponent, LlenarDatosCobroComponent],
  imports: [
    CommonModule,
    CobrosRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class CobrosModule { }
