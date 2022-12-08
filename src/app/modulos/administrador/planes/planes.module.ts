import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CrearPlanComponent } from './crear-plan/crear-plan.component';
import { ListarPlanesComponent } from './listar-planes/listar-planes.component';
import { NavegacionPlanesComponent } from './navegacion-planes/navegacion-planes.component';
import { ModificarPlanComponent } from './modificar-plan/modificar-plan.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";


@NgModule({
  declarations: [PlanesComponent, CrearPlanComponent, ListarPlanesComponent, NavegacionPlanesComponent, ModificarPlanComponent],
  imports: [
    CommonModule,
    PlanesRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class PlanesModule { }
