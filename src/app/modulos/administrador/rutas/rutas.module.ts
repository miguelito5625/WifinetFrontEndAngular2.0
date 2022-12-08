import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutasRoutingModule } from './rutas-routing.module';
import { RutasComponent } from './rutas.component';
import { NavegacionRutasComponent } from './navegacion-rutas/navegacion-rutas.component';
import { ListarRutasComponent } from './listar-rutas/listar-rutas.component';
import { CrearRutasComponent } from './crear-rutas/crear-rutas.component';
import { ModificarRutasComponent } from './modificar-rutas/modificar-rutas.component';
import { DetalleRutasComponent } from './detalle-rutas/detalle-rutas.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { QuitarInstalacionesRutasComponent } from './quitar-instalaciones-rutas/quitar-instalaciones-rutas.component';
import { AgregarInstalacionesRutasComponent } from './agregar-instalaciones-rutas/agregar-instalaciones-rutas.component';
import { TrazarMapaRutasComponent } from './trazar-mapa-rutas/trazar-mapa-rutas.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { GestionarInstalacionesRutasComponent } from './gestionar-instalaciones-rutas/gestionar-instalaciones-rutas.component';


@NgModule({
  declarations: [RutasComponent, NavegacionRutasComponent, ListarRutasComponent, CrearRutasComponent, ModificarRutasComponent, DetalleRutasComponent, QuitarInstalacionesRutasComponent, AgregarInstalacionesRutasComponent, TrazarMapaRutasComponent, GestionarInstalacionesRutasComponent],
  imports: [
    CommonModule,
    RutasRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXUy418CFyBfKppShFScH6vhsFzS6seFU',
      libraries: ["places"]
    })
  ]
})
export class RutasModule { }
