import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from 'src/app/interfaces/usuario/empleado';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private apiServer = environment.backendServer;
  
  empleadoAModificar:any;

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearUsuario(datos): Observable<Empleado> {
    return this.httpClient.post<Empleado>(this.apiServer + '/usuarios', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarUsuario(datos): Observable<Empleado> {
    return this.httpClient.put<Empleado>(this.apiServer + '/usuarios', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  crearEmpleado(datos): Observable<Empleado> {
    return this.httpClient.post<Empleado>(this.apiServer + '/empleados', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarEmpleado(datos): Observable<Empleado> {
    return this.httpClient.put<Empleado>(this.apiServer + '/empleados', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  darDeBaja(datos): Observable<Empleado> {
    return this.httpClient.patch<Empleado>(this.apiServer + '/empleados/dardebaja', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  reactivarEmpleado(datos): Observable<Empleado> {
    return this.httpClient.patch<Empleado>(this.apiServer + '/empleados/cambiar-estado', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerEmpleados(): Observable<Empleado> {
    return this.httpClient.get<Empleado>(this.apiServer + '/empleados', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerEmpleadosEmpleadosConUsuario(): Observable<Empleado> {
    return this.httpClient.get<Empleado>(this.apiServer + '/empleados/empleados-con-usuario', this.httpOptions)
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
      // errorMessage = error;
      errorMessage = error.error;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }



}
