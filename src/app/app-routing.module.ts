import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/autenticacion/login/login.component';
import { GuardAdministradorGuard } from './guard/administrador/guard-administrador.guard';
import { GuardTecnicocobradorGuard } from './guard/tecnicocobrador/guard-tecnicocobrador.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pruebas',
    loadChildren: () => import('./modulos/pruebas/pruebas.module').then(m => m.PruebasModule)
  },
  {
    path: 'administrador',
    canActivate: [GuardAdministradorGuard],
    children: [
      { path: 'usuarios', loadChildren: () => import('./modulos/administrador/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'principal-administrador', loadChildren: () => import('./modulos/administrador/principal-administrador/principal-administrador.module').then(m => m.PrincipalAdministradorModule) },
      { path: 'empleados', loadChildren: () => import('./modulos/administrador/empleados/empleados.module').then(m => m.EmpleadosModule) },
      { path: 'clientes', loadChildren: () => import('./modulos/administrador/clientes/clientes.module').then(m => m.ClientesModule) },
      { path: 'planes', loadChildren: () => import('./modulos/administrador/planes/planes.module').then(m => m.PlanesModule) },
      { path: 'costo-transacciones', loadChildren: () => import('./modulos/administrador/costo-transacciones/costo-transacciones.module').then(m => m.CostoTransaccionesModule) },
      { path: 'transacciones-instalaciones', loadChildren: () => import('./modulos/administrador/transacciones-instalaciones/transacciones-instalaciones.module').then(m => m.TransaccionesInstalacionesModule) },

      { path: 'ventas', loadChildren: () => import('./modulos/administrador/ventas/ventas.module').then(m => m.VentasModule) },
      { path: 'transacciones', loadChildren: () => import('./modulos/administrador/transacciones/transacciones.module').then(m => m.TransaccionesModule) },
      { path: 'cobros', loadChildren: () => import('./modulos/administrador/cobros/cobros.module').then(m => m.CobrosModule) },
      { path: 'boletas-deposito', loadChildren: () => import('./modulos/administrador/boletas-deposito/boletas-deposito.module').then(m => m.BoletasDepositoModule) },
      { path: 'rutas', loadChildren: () => import('./modulos/administrador/rutas/rutas.module').then(m => m.RutasModule) },
      { path: 'ajustes-boletas-deposito', loadChildren: () => import('./modulos/administrador/ajustes-boletas-deposito/ajustes-boletas-deposito.module').then(m => m.AjustesBoletasDepositoModule) },
      { path: 'clientes-morosos', loadChildren: () => import('./modulos/administrador/clientes-morosos/clientes-morosos.module').then(m => m.ClientesMorososModule) },
      { path: 'barrios', loadChildren: () => import('./modulos/administrador/barrios/barrios.module').then(m => m.BarriosModule) },
      { path: 'tipos-ajustes', loadChildren: () => import('./modulos/administrador/tipos-ajustes/tipos-ajustes.module').then(m => m.TiposAjustesModule) },
      {
        path: '',
        redirectTo: 'principal-administrador',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'principal-administrador'
      }
    ]
  },
  { path: 'tecnicocobrador', canActivate: [GuardTecnicocobradorGuard], loadChildren: () => import('./modulos/tecnicocobrador/tecnicocobrador.module').then(m => m.TecnicocobradorModule) },
  {
    path: '',
    redirectTo: 'administrador/principal-administrador',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
