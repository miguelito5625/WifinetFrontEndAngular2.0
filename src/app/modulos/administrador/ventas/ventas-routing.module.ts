import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasComponent } from './ventas.component';
import { ListarVentasComponent } from './listar-ventas/listar-ventas.component';
import { CrearVentasComponent } from './crear-ventas/crear-ventas.component';
import { DetallesVentaComponent } from './detalles-venta/detalles-venta.component';
import { ModificarVentaComponent } from './modificar-venta/modificar-venta.component';

const routes: Routes = [
  { 
    path: '', 
    component: VentasComponent,
    children: [
      { path: 'listar', component: ListarVentasComponent},
      { path: 'detalle', component: DetallesVentaComponent},
      { path: 'modificar', component: ModificarVentaComponent},
      { path: 'crear', component: CrearVentasComponent},
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
export class VentasRoutingModule { }
