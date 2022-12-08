import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Direccion } from 'src/app/interfaces/direccion/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  private apiServer = environment.backendServer;
  direccionSeleccionada:any;
  barrioSeleccionado:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  comprobarCantidadInstalacionesDeDireccion(datos): Observable<Direccion> {
    return this.httpClient.post<Direccion>(this.apiServer + '/direcciones/comprobar-cantidad-instalaciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerDepartamentos(): Observable<Direccion> {
    return this.httpClient.get<Direccion>(this.apiServer + '/departamentos', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerMunicipios(): Observable<Direccion> {
    return this.httpClient.get<Direccion>(this.apiServer + '/municipios', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  crearBarrio(datos): Observable<Direccion> {
    return this.httpClient.post<Direccion>(this.apiServer + '/barrios', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarBarrio(datos): Observable<Direccion> {
    return this.httpClient.put<Direccion>(this.apiServer + '/barrios', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  eliminarBarrio(id_barrio): Observable<Direccion> {
    return this.httpClient.delete<Direccion>(this.apiServer + '/barrios/eliminar/'+ id_barrio, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  eliminarForzosoBarrio(id_barrio): Observable<Direccion> {
    return this.httpClient.delete<Direccion>(this.apiServer + '/barrios/eliminarforzoso/'+ id_barrio, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerBarrios(): Observable<Direccion> {
    return this.httpClient.get<Direccion>(this.apiServer + '/barrios', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerMunicipiosPorDepartamento(id_departamento): Observable<Direccion> {
    return this.httpClient.get<Direccion>(this.apiServer + '/municipiospordepartamento/' + id_departamento, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerBarriosPorMunicipio(id_municipio): Observable<Direccion> {
    return this.httpClient.get<Direccion>(this.apiServer + '/barriospormunicipio/' + id_municipio, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }



  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

}
