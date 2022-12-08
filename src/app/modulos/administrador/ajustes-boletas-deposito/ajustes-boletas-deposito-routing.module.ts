import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesBoletasDepositoComponent } from './ajustes-boletas-deposito.component';
import { CrearAjustesBoletasDepositoComponent } from './crear-ajustes-boletas-deposito/crear-ajustes-boletas-deposito.component';
import { ListarAjustesBoletasDepositoComponent } from './listar-ajustes-boletas-deposito/listar-ajustes-boletas-deposito.component';
import { DetalleAjustesBoletasDepositoComponent } from './detalle-ajustes-boletas-deposito/detalle-ajustes-boletas-deposito.component';
import { ModificarAjustesBoletasDepositoComponent } from './modificar-ajustes-boletas-deposito/modificar-ajustes-boletas-deposito.component';

const routes: Routes = [
  { 
    path: '', 
    component: AjustesBoletasDepositoComponent,
    children: [
      { path: 'listar', component: ListarAjustesBoletasDepositoComponent},
      { path: 'crear', component: CrearAjustesBoletasDepositoComponent},
      { path: 'modificar', component: ModificarAjustesBoletasDepositoComponent},
      { path: 'detalle', component: DetalleAjustesBoletasDepositoComponent},
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'listar'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesBoletasDepositoRoutingModule { }
