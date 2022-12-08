import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionesInstalacionesComponent } from './transacciones-instalaciones.component';
import { ListarTransaccionesInstalacionesComponent } from './listar-transacciones-instalaciones/listar-transacciones-instalaciones.component';
import { CrearTransaccionesInstalacionesComponent } from './crear-transacciones-instalaciones/crear-transacciones-instalaciones.component';
import { ModificarTransaccionesInstalacionesComponent } from './modificar-transacciones-instalaciones/modificar-transacciones-instalaciones.component';
import { SeleccionarClienteInstalacionComponent } from './crear-transacciones-instalaciones/seleccionar-cliente-instalacion/seleccionar-cliente-instalacion.component';
import { SeleccionarDireccionClienteInstalacionComponent } from './crear-transacciones-instalaciones/seleccionar-direccion-cliente-instalacion/seleccionar-direccion-cliente-instalacion.component';
import { LlenarDatosInstalacionComponent } from './crear-transacciones-instalaciones/llenar-datos-instalacion/llenar-datos-instalacion.component';
import { DetallesTransaccionesInstalacionesComponent } from './detalles-transacciones-instalaciones/detalles-transacciones-instalaciones.component';
import { SeleccionarClienteRefirioComponent } from './crear-transacciones-instalaciones/seleccionar-cliente-refirio/seleccionar-cliente-refirio.component';

const routes: Routes = [
  { 
    path: '', 
    component: TransaccionesInstalacionesComponent,
    children: [
      { path: 'listar', component: ListarTransaccionesInstalacionesComponent},
      { path: 'detalles', component: DetallesTransaccionesInstalacionesComponent},
      { path: 'modificar', component: ModificarTransaccionesInstalacionesComponent},
      { path: 'crear', component: CrearTransaccionesInstalacionesComponent,
      children: [
        {
          path: 'seleccionar-cliente-instalacion',
          component: SeleccionarClienteInstalacionComponent
        },
        {
          path: 'seleccionar-cliente-refirio',
          component: SeleccionarClienteRefirioComponent
        },
        {
          path: 'seleccionar-direccion-cliente',
          component: SeleccionarDireccionClienteInstalacionComponent
        },
        {
          path: 'llenar-datos-instalacion',
          component: LlenarDatosInstalacionComponent
        },
        {
          path: '',
          redirectTo: 'seleccionar-cliente',
          pathMatch: 'full'
        }
      ]
      },
      // { path: 'modificar', component: ModificarTransaccionesInstalacionesComponent},
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
export class TransaccionesInstalacionesRoutingModule { }
