import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesComponent } from './planes.component';
import { ListarPlanesComponent } from './listar-planes/listar-planes.component';
import { CrearPlanComponent } from './crear-plan/crear-plan.component';
import { ModificarPlanComponent } from './modificar-plan/modificar-plan.component';

const routes: Routes = [
  { 
    path: '', 
    component: PlanesComponent,
    children: [
      { path: 'listar', component: ListarPlanesComponent},
      { path: 'crear', component: CrearPlanComponent},
      { path: 'modificar', component: ModificarPlanComponent},
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
export class PlanesRoutingModule { }
