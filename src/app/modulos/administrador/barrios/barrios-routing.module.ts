import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarriosComponent } from './barrios.component';
import { ListarBarriosComponent } from './listar-barrios/listar-barrios.component';
import { CrearBarriosComponent } from './crear-barrios/crear-barrios.component';
import { ModificarBarriosComponent } from './modificar-barrios/modificar-barrios.component';

const routes: Routes = [
  { 
    path: '', 
    component: BarriosComponent,
    children: [
      { path: 'listar', component: ListarBarriosComponent},
      { path: 'crear', component: CrearBarriosComponent},
      { path: 'modificar', component: ModificarBarriosComponent},
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
export class BarriosRoutingModule { }
