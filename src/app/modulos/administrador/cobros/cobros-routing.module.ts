import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobrosComponent } from './cobros.component';
import { ListarCobrosComponent } from './listar-cobros/listar-cobros.component';
import { DetalleCobrosComponent } from './detalle-cobros/detalle-cobros.component';
import { ModificarCobrosComponent } from './modificar-cobros/modificar-cobros.component';
import { CrearCobrosComponent } from './crear-cobros/crear-cobros.component';
import { SeleccionarClienteCobroComponent } from './crear-cobros/seleccionar-cliente-cobro/seleccionar-cliente-cobro.component';
import { SeleccionarInstalacionCobroComponent } from './crear-cobros/seleccionar-instalacion-cobro/seleccionar-instalacion-cobro.component';
import { LlenarDatosCobroComponent } from './crear-cobros/llenar-datos-cobro/llenar-datos-cobro.component';

const routes: Routes = [
  { 
    path: '', 
    component: CobrosComponent,
    children: [
      { path: 'listar', component: ListarCobrosComponent},
      { path: 'detalles', component: DetalleCobrosComponent},
      { path: 'modificar', component: ModificarCobrosComponent},
      { path: 'crear', component: CrearCobrosComponent,
      children: [
        {
          path: 'seleccionar-cliente-cobro',
          component: SeleccionarClienteCobroComponent
        },
        {
          path: 'seleccionar-instalacion-cobro',
          component: SeleccionarInstalacionCobroComponent
        },
        {
          path: 'llenar-datos-cobro',
          component: LlenarDatosCobroComponent
        },
        {
          path: '',
          redirectTo: 'seleccionar-cliente-cobro',
          pathMatch: 'full'
        }
      ]
      },
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
export class CobrosRoutingModule { }
