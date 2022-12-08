import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesMorososComponent } from './clientes-morosos.component';
import { ListarClientesMorososComponent } from './listar-clientes-morosos/listar-clientes-morosos.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClientesMorososComponent,
    children: [
      { path: 'listar', component: ListarClientesMorososComponent},
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
export class ClientesMorososRoutingModule { }
