import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaDatatableComponent } from './prueba-datatable/prueba-datatable.component';
import { PruebaPrincipalComponent } from './prueba-principal/prueba-principal.component';
import { PruebaSubirArchivoComponent } from './prueba-subir-archivo/prueba-subir-archivo.component';
import { PruebaJwtComponent } from './prueba-jwt/prueba-jwt.component';


const routes: Routes = [
  {
    path: '',
    component: PruebaPrincipalComponent,
    children: [
      {
        path: 'prueba-tabla1',
        component: PruebaDatatableComponent
      },
      {
        path: 'prueba-subir-archivo',
        component: PruebaSubirArchivoComponent
      },
      {
        path: 'prueba-jwt',
        component: PruebaJwtComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebasRoutingModule { }
