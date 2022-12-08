import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ListarEmpleadosComponent } from './listar-empleados/listar-empleados.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { NavegacionEmpleadosComponent } from './navegacion-empleados/navegacion-empleados.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ModificarEmpleadoComponent } from './modificar-empleado/modificar-empleado.component';
import { DetallesEmpleadoComponent } from './detalles-empleado/detalles-empleado.component';
import { CrearUsuarioEmpleadoComponent } from './crear-usuario-empleado/crear-usuario-empleado.component';
import { ModificarUsuarioEmpleadoComponent } from './modificar-usuario-empleado/modificar-usuario-empleado.component';


@NgModule({
  declarations: [EmpleadosComponent, ListarEmpleadosComponent, CrearEmpleadoComponent, NavegacionEmpleadosComponent, ModificarEmpleadoComponent, DetallesEmpleadoComponent, CrearUsuarioEmpleadoComponent, ModificarUsuarioEmpleadoComponent],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class EmpleadosModule { }
