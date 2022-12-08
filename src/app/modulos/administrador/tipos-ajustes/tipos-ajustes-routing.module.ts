import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposAjustesComponent } from './tipos-ajustes.component';
import { ListarTiposAjustesComponent } from './listar-tipos-ajustes/listar-tipos-ajustes.component';
import { CrearTiposAjustesComponent } from './crear-tipos-ajustes/crear-tipos-ajustes.component';
import { ModificarTiposAjustesComponent } from './modificar-tipos-ajustes/modificar-tipos-ajustes.component';

const routes: Routes = [
  { 
    path: '', 
    component: TiposAjustesComponent,
    children: [
      { path: 'listar', component: ListarTiposAjustesComponent},
      { path: 'crear', component: CrearTiposAjustesComponent},
      { path: 'modificar', component: ModificarTiposAjustesComponent},
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
export class TiposAjustesRoutingModule { }
