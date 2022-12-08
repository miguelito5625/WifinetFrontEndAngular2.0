import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalAdministradorComponent } from './principal-administrador.component';
import { ListaModulosAdministradorComponent } from './lista-modulos-administrador/lista-modulos-administrador.component';

const routes: Routes = [
  { path: '', component: PrincipalAdministradorComponent, 
  children: [
    // {
    //   path: 'lista-modulos',
    //   component: ListaModulosAdministradorComponent
    // },
    // {
    //   path: '**',
    //   redirectTo: ''
    // }
    // {
    //   path: '',
    //   redirectTo: 'lista-modulos',
    //   pathMatch: 'full'
    // }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalAdministradorRoutingModule { }
