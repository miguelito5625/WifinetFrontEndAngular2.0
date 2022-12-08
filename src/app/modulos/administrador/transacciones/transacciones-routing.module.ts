import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionesComponent } from './transacciones.component';
import { ListarTransaccionesComponent } from './listar-transacciones/listar-transacciones.component';
import { DetallesTransaccionesComponent } from './detalles-transacciones/detalles-transacciones.component';

const routes: Routes = [
  { 
    path: '', 
    component: TransaccionesComponent,
    children: [
      { path: 'listar', component: ListarTransaccionesComponent},
      { path: 'detalles', component: DetallesTransaccionesComponent},
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
export class TransaccionesRoutingModule { }
