import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { NavegacionUsuariosComponent } from './navegacion-usuarios/navegacion-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [UsuariosComponent, NavegacionUsuariosComponent, EditarUsuarioComponent, CrearUsuarioComponent, InformacionUsuarioComponent, ListarUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
