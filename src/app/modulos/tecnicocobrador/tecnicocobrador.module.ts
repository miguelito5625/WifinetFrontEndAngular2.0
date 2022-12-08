import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicocobradorRoutingModule } from './tecnicocobrador-routing.module';
import { TecnicocobradorComponent } from './tecnicocobrador.component';
import { NavegacionTecnicocobradorComponent } from './navegacion-tecnicocobrador/navegacion-tecnicocobrador.component';
import { PrincipalTecnicocobradorComponent } from './principal-tecnicocobrador/principal-tecnicocobrador.component';
import { ListarInstalacionesComponent } from './instalaciones/listar-instalaciones/listar-instalaciones.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReactiveFormsModule } from "@angular/forms";
import { CrearInstalacionesComponent } from './instalaciones/crear-instalaciones/crear-instalaciones.component';
import { LlenarDatosInstalacionComponent } from './instalaciones/crear-instalaciones/llenar-datos-instalacion/llenar-datos-instalacion.component';
import { SeleccionarClienteInstalacionComponent } from './instalaciones/crear-instalaciones/seleccionar-cliente-instalacion/seleccionar-cliente-instalacion.component';
import { SeleccionarClienteRefirioComponent } from './instalaciones/crear-instalaciones/seleccionar-cliente-refirio/seleccionar-cliente-refirio.component';
import { SeleccionarDireccionClienteInstalacionComponent } from './instalaciones/crear-instalaciones/seleccionar-direccion-cliente-instalacion/seleccionar-direccion-cliente-instalacion.component';
import { DetallesInstalacionesComponent } from './instalaciones/detalles-instalaciones/detalles-instalaciones.component';
import { VentasComponent } from './ventas/ventas.component';
import { CrearVentasComponent } from './ventas/crear-ventas/crear-ventas.component';
import { DetallesVentasComponent } from './ventas/detalles-ventas/detalles-ventas.component';
import { ListarVentasComponent } from './ventas/listar-ventas/listar-ventas.component';
import { CobrosComponent } from './cobros/cobros.component';
import { DetallesCobrosComponent } from './cobros/detalles-cobros/detalles-cobros.component';
import { ListarCobrosComponent } from './cobros/listar-cobros/listar-cobros.component';
import { CrearCobrosComponent } from './cobros/crear-cobros/crear-cobros.component';
import { LlenarDatosCobroComponent } from './cobros/crear-cobros/llenar-datos-cobro/llenar-datos-cobro.component';
import { SeleccionarClienteCobroComponent } from './cobros/crear-cobros/seleccionar-cliente-cobro/seleccionar-cliente-cobro.component';
import { SeleccionarInstalacionCobroComponent } from './cobros/crear-cobros/seleccionar-instalacion-cobro/seleccionar-instalacion-cobro.component';
import { RutasComponent } from './rutas/rutas.component';
import { ListarRutasComponent } from './rutas/listar-rutas/listar-rutas.component';
import { TrazarRutasComponent } from './rutas/trazar-rutas/trazar-rutas.component';
import { DetallesRutasComponent } from './rutas/detalles-rutas/detalles-rutas.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ClientesComponent } from './clientes/clientes.component';
import { AgregarDireccionClienteComponent } from './clientes/agregar-direccion-cliente/agregar-direccion-cliente.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { DetallesClienteComponent } from './clientes/detalles-cliente/detalles-cliente.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { ListarDireccionesClienteComponent } from './clientes/listar-direcciones-cliente/listar-direcciones-cliente.component';
import { ModificarClienteComponent } from './clientes/modificar-cliente/modificar-cliente.component';
import { ModificarDireccionesClienteComponent } from './clientes/modificar-direcciones-cliente/modificar-direcciones-cliente.component';
import { BoletasDepositoComponent } from './boletas-deposito/boletas-deposito.component';
import { CrearBoletaDepositoComponent } from './boletas-deposito/crear-boleta-deposito/crear-boleta-deposito.component';
import { DetalleBoletaDepositoComponent } from './boletas-deposito/detalle-boleta-deposito/detalle-boleta-deposito.component';
import { GestionarTransaccionesBoletaDepositoComponent } from './boletas-deposito/gestionar-transacciones-boleta-deposito/gestionar-transacciones-boleta-deposito.component';
import { ListarBoletasDepositoComponent } from './boletas-deposito/listar-boletas-deposito/listar-boletas-deposito.component';

@NgModule({
  declarations: [TecnicocobradorComponent, NavegacionTecnicocobradorComponent, PrincipalTecnicocobradorComponent, ListarInstalacionesComponent, InstalacionesComponent, CrearInstalacionesComponent, LlenarDatosInstalacionComponent, SeleccionarClienteInstalacionComponent, SeleccionarClienteRefirioComponent, SeleccionarDireccionClienteInstalacionComponent, DetallesInstalacionesComponent, VentasComponent, CrearVentasComponent, DetallesVentasComponent, ListarVentasComponent, CobrosComponent, DetallesCobrosComponent, ListarCobrosComponent, CrearCobrosComponent, LlenarDatosCobroComponent, SeleccionarClienteCobroComponent, SeleccionarInstalacionCobroComponent, RutasComponent, ListarRutasComponent, TrazarRutasComponent, DetallesRutasComponent, ClientesComponent, AgregarDireccionClienteComponent, CrearClienteComponent, DetallesClienteComponent, ListarClientesComponent, ListarDireccionesClienteComponent, ModificarClienteComponent, ModificarDireccionesClienteComponent, BoletasDepositoComponent, CrearBoletaDepositoComponent, DetalleBoletaDepositoComponent, GestionarTransaccionesBoletaDepositoComponent, ListarBoletasDepositoComponent],
  imports: [
    CommonModule,
    TecnicocobradorRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXUy418CFyBfKppShFScH6vhsFzS6seFU',
      libraries: ["places"]
    })
  ]
})
export class TecnicocobradorModule { }
