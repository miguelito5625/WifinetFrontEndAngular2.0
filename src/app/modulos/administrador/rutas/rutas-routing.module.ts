import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutasComponent } from './rutas.component';
import { ListarRutasComponent } from './listar-rutas/listar-rutas.component';
import { CrearRutasComponent } from './crear-rutas/crear-rutas.component';
import { ModificarRutasComponent } from './modificar-rutas/modificar-rutas.component';
import { DetalleRutasComponent } from './detalle-rutas/detalle-rutas.component';
import { QuitarInstalacionesRutasComponent } from './quitar-instalaciones-rutas/quitar-instalaciones-rutas.component';
import { AgregarInstalacionesRutasComponent } from './agregar-instalaciones-rutas/agregar-instalaciones-rutas.component';
import { TrazarMapaRutasComponent } from './trazar-mapa-rutas/trazar-mapa-rutas.component';
import { GestionarInstalacionesRutasComponent } from './gestionar-instalaciones-rutas/gestionar-instalaciones-rutas.component';

const routes: Routes = [
  { 
    path: '', 
    component: RutasComponent,
    children: [
      { path: 'listar', component: ListarRutasComponent},
      { path: 'crear', component: CrearRutasComponent},
      { path: 'modificar', component: ModificarRutasComponent},
      { path: 'detalle', component: DetalleRutasComponent},
      { path: 'quitar-instalaciones', component: QuitarInstalacionesRutasComponent},
      { path: 'agregar-instalaciones', component: AgregarInstalacionesRutasComponent},
      { path: 'trazar-ruta', component: TrazarMapaRutasComponent},
      { path: 'gestionar-instalaciones', component: GestionarInstalacionesRutasComponent},
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
export class RutasRoutingModule { }
