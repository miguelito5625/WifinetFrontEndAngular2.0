import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { NavegacionClientesComponent } from './navegacion-clientes/navegacion-clientes.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { DetallesClienteComponent } from './detalles-cliente/detalles-cliente.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { ModificarClienteComponent } from './modificar-cliente/modificar-cliente.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AgregarDireccionClienteComponent } from './agregar-direccion-cliente/agregar-direccion-cliente.component';
import { ListarDireccionesClienteComponent } from './listar-direcciones-cliente/listar-direcciones-cliente.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ModificarDireccionesClienteComponent } from './modificar-direcciones-cliente/modificar-direcciones-cliente.component';



@NgModule({
  declarations: [ClientesComponent, NavegacionClientesComponent, CrearClienteComponent, DetallesClienteComponent, ListarClientesComponent, ModificarClienteComponent, AgregarDireccionClienteComponent, ListarDireccionesClienteComponent, ModificarDireccionesClienteComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXUy418CFyBfKppShFScH6vhsFzS6seFU',
      libraries: ["places"]
    }),
  ]
})
export class ClientesModule { }
