import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostoTransaccionesComponent } from './costo-transacciones.component';
import { ListarCostoTransaccionesComponent } from './listar-costo-transacciones/listar-costo-transacciones.component';
import { CrearCostoTransaccionesComponent } from './crear-costo-transacciones/crear-costo-transacciones.component';
import { DetallesCostoTransaccionesComponent } from './detalles-costo-transacciones/detalles-costo-transacciones.component';

const routes: Routes = [
  { 
    path: '', 
    component: CostoTransaccionesComponent,
    children: [
      { path: 'listar', component: ListarCostoTransaccionesComponent},
      { path: 'crear', component: CrearCostoTransaccionesComponent},
      { path: 'detalle', component: DetallesCostoTransaccionesComponent},
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
export class CostoTransaccionesRoutingModule { }
