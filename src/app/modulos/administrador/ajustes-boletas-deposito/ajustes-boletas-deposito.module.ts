import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesBoletasDepositoRoutingModule } from './ajustes-boletas-deposito-routing.module';
import { AjustesBoletasDepositoComponent } from './ajustes-boletas-deposito.component';
import { NavegacionAjustesBoletasDepositoComponent } from './navegacion-ajustes-boletas-deposito/navegacion-ajustes-boletas-deposito.component';
import { ListarAjustesBoletasDepositoComponent } from './listar-ajustes-boletas-deposito/listar-ajustes-boletas-deposito.component';
import { CrearAjustesBoletasDepositoComponent } from './crear-ajustes-boletas-deposito/crear-ajustes-boletas-deposito.component';
import { DetalleAjustesBoletasDepositoComponent } from './detalle-ajustes-boletas-deposito/detalle-ajustes-boletas-deposito.component';
import { ModificarAjustesBoletasDepositoComponent } from './modificar-ajustes-boletas-deposito/modificar-ajustes-boletas-deposito.component';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AjustesBoletasDepositoComponent, NavegacionAjustesBoletasDepositoComponent, ListarAjustesBoletasDepositoComponent, CrearAjustesBoletasDepositoComponent, DetalleAjustesBoletasDepositoComponent, ModificarAjustesBoletasDepositoComponent],
  imports: [
    CommonModule,
    AjustesBoletasDepositoRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class AjustesBoletasDepositoModule { }
