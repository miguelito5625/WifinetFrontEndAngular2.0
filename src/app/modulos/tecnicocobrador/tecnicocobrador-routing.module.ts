import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TecnicocobradorComponent } from './tecnicocobrador.component';
import { PrincipalTecnicocobradorComponent } from './principal-tecnicocobrador/principal-tecnicocobrador.component';
import { ListarInstalacionesComponent } from './instalaciones/listar-instalaciones/listar-instalaciones.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { CrearInstalacionesComponent } from './instalaciones/crear-instalaciones/crear-instalaciones.component';
import { SeleccionarClienteInstalacionComponent } from './instalaciones/crear-instalaciones/seleccionar-cliente-instalacion/seleccionar-cliente-instalacion.component';
import { SeleccionarClienteRefirioComponent } from './instalaciones/crear-instalaciones/seleccionar-cliente-refirio/seleccionar-cliente-refirio.component';
import { SeleccionarDireccionClienteInstalacionComponent } from './instalaciones/crear-instalaciones/seleccionar-direccion-cliente-instalacion/seleccionar-direccion-cliente-instalacion.component';
import { LlenarDatosInstalacionComponent } from './instalaciones/crear-instalaciones/llenar-datos-instalacion/llenar-datos-instalacion.component';
import { DetallesInstalacionesComponent } from './instalaciones/detalles-instalaciones/detalles-instalaciones.component';
import { VentasComponent } from './ventas/ventas.component';
import { ListarVentasComponent } from './ventas/listar-ventas/listar-ventas.component';
import { DetallesVentasComponent } from './ventas/detalles-ventas/detalles-ventas.component';
import { CrearVentasComponent } from './ventas/crear-ventas/crear-ventas.component';
import { CobrosComponent } from './cobros/cobros.component';
import { ListarCobrosComponent } from './cobros/listar-cobros/listar-cobros.component';
import { DetallesCobrosComponent } from './cobros/detalles-cobros/detalles-cobros.component';
import { CrearCobrosComponent } from './cobros/crear-cobros/crear-cobros.component';
import { SeleccionarClienteCobroComponent } from './cobros/crear-cobros/seleccionar-cliente-cobro/seleccionar-cliente-cobro.component';
import { SeleccionarInstalacionCobroComponent } from './cobros/crear-cobros/seleccionar-instalacion-cobro/seleccionar-instalacion-cobro.component';
import { LlenarDatosCobroComponent } from './cobros/crear-cobros/llenar-datos-cobro/llenar-datos-cobro.component';
import { RutasComponent } from './rutas/rutas.component';
import { ListarRutasComponent } from './rutas/listar-rutas/listar-rutas.component';
import { TrazarRutasComponent } from './rutas/trazar-rutas/trazar-rutas.component';
import { DetallesRutasComponent } from './rutas/detalles-rutas/detalles-rutas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { ModificarClienteComponent } from './clientes/modificar-cliente/modificar-cliente.component';
import { DetallesClienteComponent } from './clientes/detalles-cliente/detalles-cliente.component';
import { AgregarDireccionClienteComponent } from './clientes/agregar-direccion-cliente/agregar-direccion-cliente.component';
import { ListarDireccionesClienteComponent } from './clientes/listar-direcciones-cliente/listar-direcciones-cliente.component';
import { ModificarDireccionesClienteComponent } from './clientes/modificar-direcciones-cliente/modificar-direcciones-cliente.component';
import { BoletasDepositoComponent } from './boletas-deposito/boletas-deposito.component';
import { ListarBoletasDepositoComponent } from './boletas-deposito/listar-boletas-deposito/listar-boletas-deposito.component';
import { CrearBoletaDepositoComponent } from './boletas-deposito/crear-boleta-deposito/crear-boleta-deposito.component';
import { GestionarTransaccionesBoletaDepositoComponent } from './boletas-deposito/gestionar-transacciones-boleta-deposito/gestionar-transacciones-boleta-deposito.component';
import { DetalleBoletaDepositoComponent } from './boletas-deposito/detalle-boleta-deposito/detalle-boleta-deposito.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicocobradorComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalTecnicocobradorComponent
      },
      {
        path: 'boletas-deposito',
        component: BoletasDepositoComponent,
        children: [
          { path: 'listar', component: ListarBoletasDepositoComponent },
          { path: 'crear', component: CrearBoletaDepositoComponent },
          { path: 'gestionar-transacciones-boleta', component: GestionarTransaccionesBoletaDepositoComponent },
          { path: 'detalle', component: DetalleBoletaDepositoComponent },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        children: [
          { path: 'listar', component: ListarClientesComponent },
          { path: 'crear', component: CrearClienteComponent },
          { path: 'modificar', component: ModificarClienteComponent },
          { path: 'detalle', component: DetallesClienteComponent },
          { path: 'agregar-direccion', component: AgregarDireccionClienteComponent },
          { path: 'listar-direcciones', component: ListarDireccionesClienteComponent },
          { path: 'modificar-direcciones', component: ModificarDireccionesClienteComponent },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          },
        ]
      },
      {
        path: 'rutas',
        component: RutasComponent,
        children: [
          {
            path: 'listar',
            component: ListarRutasComponent
          },
          {
            path: 'trazar',
            component: TrazarRutasComponent
          },
          {
            path: 'detalles',
            component: DetallesRutasComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'cobros',
        component: CobrosComponent,
        children: [
          {
            path: 'listar',
            component: ListarCobrosComponent
          },
          {
            path: 'detalles',
            component: DetallesCobrosComponent
          },
          {
            path: 'crear', component: CrearCobrosComponent,
            children: [
              {
                path: 'seleccionar-cliente-cobro',
                component: SeleccionarClienteCobroComponent
              },
              {
                path: 'seleccionar-instalacion-cobro',
                component: SeleccionarInstalacionCobroComponent
              },
              {
                path: 'llenar-datos-cobro',
                component: LlenarDatosCobroComponent
              },
              {
                path: '',
                redirectTo: 'seleccionar-cliente-cobro',
                pathMatch: 'full'
              }
            ]
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'ventas',
        component: VentasComponent,
        children: [
          {
            path: 'listar',
            component: ListarVentasComponent
          },
          {
            path: 'crear',
            component: CrearVentasComponent
          },
          {
            path: 'detalle',
            component: DetallesVentasComponent
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'instalaciones',
        component: InstalacionesComponent,
        children: [
          {
            path: 'listar',
            component: ListarInstalacionesComponent
          },
          {
            path: 'detalles',
            component: DetallesInstalacionesComponent
          },
          {
            path: 'crear',
            component: CrearInstalacionesComponent,
            children: [
              {
                path: 'seleccionar-cliente-instalacion',
                component: SeleccionarClienteInstalacionComponent
              },
              {
                path: 'seleccionar-cliente-refirio',
                component: SeleccionarClienteRefirioComponent
              },
              {
                path: 'seleccionar-direccion-cliente',
                component: SeleccionarDireccionClienteInstalacionComponent
              },
              {
                path: 'llenar-datos-instalacion',
                component: LlenarDatosInstalacionComponent
              },
              {
                path: '',
                redirectTo: 'seleccionar-cliente',
                pathMatch: 'full'
              }
            ]
          },
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicocobradorRoutingModule { }
