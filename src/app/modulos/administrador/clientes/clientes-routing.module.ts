import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ModificarClienteComponent } from './modificar-cliente/modificar-cliente.component';
import { DetallesClienteComponent } from './detalles-cliente/detalles-cliente.component';
import { AgregarDireccionClienteComponent } from './agregar-direccion-cliente/agregar-direccion-cliente.component';
import { ListarDireccionesClienteComponent } from './listar-direcciones-cliente/listar-direcciones-cliente.component';
import { ModificarDireccionesClienteComponent } from './modificar-direcciones-cliente/modificar-direcciones-cliente.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClientesComponent,
    children: [
      { path: 'listar', component: ListarClientesComponent},
      { path: 'crear', component: CrearClienteComponent},
      { path: 'modificar', component: ModificarClienteComponent},
      { path: 'detalle', component: DetallesClienteComponent},
      { path: 'agregar-direccion', component: AgregarDireccionClienteComponent},
      { path: 'listar-direcciones', component: ListarDireccionesClienteComponent},
      { path: 'modificar-direcciones', component: ModificarDireccionesClienteComponent},
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
export class ClientesRoutingModule { }
