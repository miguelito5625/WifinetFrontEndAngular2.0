import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalAdministradorRoutingModule } from './principal-administrador-routing.module';
import { PrincipalAdministradorComponent } from './principal-administrador.component';
import { NavegacionPrincipalAdministradorComponent } from './navegacion-principal-administrador/navegacion-principal-administrador.component';
import { ListaModulosAdministradorComponent } from './lista-modulos-administrador/lista-modulos-administrador.component';


@NgModule({
  declarations: [PrincipalAdministradorComponent, NavegacionPrincipalAdministradorComponent, ListaModulosAdministradorComponent],
  imports: [
    CommonModule,
    PrincipalAdministradorRoutingModule
  ]
})
export class PrincipalAdministradorModule { }
