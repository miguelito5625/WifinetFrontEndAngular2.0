import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebasRoutingModule } from './pruebas-routing.module';
import { PruebaDatatableComponent } from './prueba-datatable/prueba-datatable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PruebaSubirArchivoComponent } from './prueba-subir-archivo/prueba-subir-archivo.component';
import { PruebaPrincipalComponent } from './prueba-principal/prueba-principal.component';
import { PruebaJwtComponent } from './prueba-jwt/prueba-jwt.component';




@NgModule({
  declarations: [PruebaDatatableComponent, PruebaSubirArchivoComponent, PruebaPrincipalComponent, PruebaJwtComponent],
  imports: [
    CommonModule,
    PruebasRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class PruebasModule { }
