import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent,
  children: [
    { path: 'listar', component: ListarUsuariosComponent},
    { path: 'crear', component: CrearUsuarioComponent},
    {
      path: '',
      redirectTo: 'listar',
      pathMatch: 'full'
    }
  ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
