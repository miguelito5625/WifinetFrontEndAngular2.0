import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposAjustesRoutingModule } from './tipos-ajustes-routing.module';
import { TiposAjustesComponent } from './tipos-ajustes.component';
import { NavegacionTiposAjustesComponent } from './navegacion-tipos-ajustes/navegacion-tipos-ajustes.component';
import { CrearTiposAjustesComponent } from './crear-tipos-ajustes/crear-tipos-ajustes.component';
import { ListarTiposAjustesComponent } from './listar-tipos-ajustes/listar-tipos-ajustes.component';
import { ModificarTiposAjustesComponent } from './modificar-tipos-ajustes/modificar-tipos-ajustes.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [TiposAjustesComponent, NavegacionTiposAjustesComponent, CrearTiposAjustesComponent, ListarTiposAjustesComponent, ModificarTiposAjustesComponent],
  imports: [
    CommonModule,
    TiposAjustesRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class TiposAjustesModule { }
