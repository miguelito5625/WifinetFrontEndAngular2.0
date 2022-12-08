import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletasDepositoComponent } from './boletas-deposito.component';
import { ListarBoletasDepositoComponent } from './listar-boletas-deposito/listar-boletas-deposito.component';
import { CrearBoletasDepositoComponent } from './crear-boletas-deposito/crear-boletas-deposito.component';
import { ModificarBoletasDepositoComponent } from './modificar-boletas-deposito/modificar-boletas-deposito.component';
import { GestionarTransaccionesBoletaComponent } from './gestionar-transacciones/gestionar-transacciones-boleta.component';
import { DetalleBoletasDepositoComponent } from './detalle-boletas-deposito/detalle-boletas-deposito.component';
import { TodosAjustesBoletasDepositoComponent } from './todos-ajustes-boletas-deposito/todos-ajustes-boletas-deposito.component';
import { DetalleAjusteBoletaDepositoComponent } from './detalle-ajuste-boleta-deposito/detalle-ajuste-boleta-deposito.component';

const routes: Routes = [
  { 
    path: '', 
    component: BoletasDepositoComponent,
    children: [
      { path: 'todos-los-ajustes', component: TodosAjustesBoletasDepositoComponent},
      { path: 'detalle-ajuste', component: DetalleAjusteBoletaDepositoComponent},
      { path: 'listar', component: ListarBoletasDepositoComponent},
      { path: 'crear', component: CrearBoletasDepositoComponent},
      { path: 'modificar', component: ModificarBoletasDepositoComponent},
      { path: 'gestionar-transacciones-boleta', component: GestionarTransaccionesBoletaComponent},
      { path: 'detalle', component: DetalleBoletasDepositoComponent},
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
export class BoletasDepositoRoutingModule { }
