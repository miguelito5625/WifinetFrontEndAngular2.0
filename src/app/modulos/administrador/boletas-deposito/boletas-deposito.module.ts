import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoletasDepositoRoutingModule } from './boletas-deposito-routing.module';
import { BoletasDepositoComponent } from './boletas-deposito.component';
import { NavegacionBoletasDepositoComponent } from './navegacion-boletas-deposito/navegacion-boletas-deposito.component';
import { ListarBoletasDepositoComponent } from './listar-boletas-deposito/listar-boletas-deposito.component';
import { ModificarBoletasDepositoComponent } from './modificar-boletas-deposito/modificar-boletas-deposito.component';
import { CrearBoletasDepositoComponent } from './crear-boletas-deposito/crear-boletas-deposito.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";
import { GestionarTransaccionesBoletaComponent } from './gestionar-transacciones/gestionar-transacciones-boleta.component';
import { DetalleBoletasDepositoComponent } from './detalle-boletas-deposito/detalle-boletas-deposito.component';
import { TodosAjustesBoletasDepositoComponent } from './todos-ajustes-boletas-deposito/todos-ajustes-boletas-deposito.component';
import { DetalleAjusteBoletaDepositoComponent } from './detalle-ajuste-boleta-deposito/detalle-ajuste-boleta-deposito.component';

@NgModule({
  declarations: [BoletasDepositoComponent, NavegacionBoletasDepositoComponent, ListarBoletasDepositoComponent, ModificarBoletasDepositoComponent, CrearBoletasDepositoComponent, GestionarTransaccionesBoletaComponent, DetalleBoletasDepositoComponent, TodosAjustesBoletasDepositoComponent, DetalleAjusteBoletaDepositoComponent],
  imports: [
    CommonModule,
    BoletasDepositoRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class BoletasDepositoModule { }
