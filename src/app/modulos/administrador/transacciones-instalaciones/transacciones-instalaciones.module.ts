import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesInstalacionesRoutingModule } from './transacciones-instalaciones-routing.module';
import { TransaccionesInstalacionesComponent } from './transacciones-instalaciones.component';
import { ListarTransaccionesInstalacionesComponent } from './listar-transacciones-instalaciones/listar-transacciones-instalaciones.component';
import { CrearTransaccionesInstalacionesComponent } from './crear-transacciones-instalaciones/crear-transacciones-instalaciones.component';
import { ModificarTransaccionesInstalacionesComponent } from './modificar-transacciones-instalaciones/modificar-transacciones-instalaciones.component';
import { NavegacionTransaccionesInstalacionesComponent } from './navegacion-transacciones-instalaciones/navegacion-transacciones-instalaciones.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";
import { SeleccionarClienteInstalacionComponent } from './crear-transacciones-instalaciones/seleccionar-cliente-instalacion/seleccionar-cliente-instalacion.component';
import { SeleccionarDireccionClienteInstalacionComponent } from './crear-transacciones-instalaciones/seleccionar-direccion-cliente-instalacion/seleccionar-direccion-cliente-instalacion.component';
import { LlenarDatosInstalacionComponent } from './crear-transacciones-instalaciones/llenar-datos-instalacion/llenar-datos-instalacion.component';
import { DetallesTransaccionesInstalacionesComponent } from './detalles-transacciones-instalaciones/detalles-transacciones-instalaciones.component';
import { SeleccionarClienteRefirioComponent } from './crear-transacciones-instalaciones/seleccionar-cliente-refirio/seleccionar-cliente-refirio.component';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { environment } from '../../../../environments/environment';



@NgModule({
  declarations: [TransaccionesInstalacionesComponent, ListarTransaccionesInstalacionesComponent, CrearTransaccionesInstalacionesComponent, ModificarTransaccionesInstalacionesComponent, NavegacionTransaccionesInstalacionesComponent, SeleccionarClienteInstalacionComponent, SeleccionarDireccionClienteInstalacionComponent, LlenarDatosInstalacionComponent, DetallesTransaccionesInstalacionesComponent, SeleccionarClienteRefirioComponent],
  imports: [
    CommonModule,
    TransaccionesInstalacionesRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule
  ]
})
export class TransaccionesInstalacionesModule { }
