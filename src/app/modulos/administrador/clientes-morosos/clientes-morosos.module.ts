import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesMorososRoutingModule } from './clientes-morosos-routing.module';
import { ClientesMorososComponent } from './clientes-morosos.component';
import { ListarClientesMorososComponent } from './listar-clientes-morosos/listar-clientes-morosos.component';
import { NavegacionClientesMorososComponent } from './navegacion-clientes-morosos/navegacion-clientes-morosos.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ClientesMorososComponent, ListarClientesMorososComponent, NavegacionClientesMorososComponent],
  imports: [
    CommonModule,
    ClientesMorososRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class ClientesMorososModule { }
