import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosComponent } from './empleados.component';
import { ListarEmpleadosComponent } from './listar-empleados/listar-empleados.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { ModificarEmpleadoComponent } from './modificar-empleado/modificar-empleado.component';
import { DetallesEmpleadoComponent } from './detalles-empleado/detalles-empleado.component';
import { ModificarUsuarioEmpleadoComponent } from './modificar-usuario-empleado/modificar-usuario-empleado.component';
import { CrearUsuarioEmpleadoComponent } from './crear-usuario-empleado/crear-usuario-empleado.component';

const routes: Routes = [
  { 
    path: '', 
    component: EmpleadosComponent,
    children: [
      { path: 'listar', component: ListarEmpleadosComponent},
      { path: 'crear', component: CrearEmpleadoComponent},
      { path: 'modificar', component: ModificarEmpleadoComponent},
      { path: 'detalle', component: DetallesEmpleadoComponent},
      { path: 'crear-usuario', component: CrearUsuarioEmpleadoComponent},
      { path: 'editar-usuario', component: ModificarUsuarioEmpleadoComponent},
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
