import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Venta } from 'src/app/interfaces/venta/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiServer = environment.backendServer;
  ventaSeleccionada:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearVenta(datos): Observable<Venta> {
    return this.httpClient.post<Venta>(this.apiServer + '/ventas', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cambiarEstadoVenta(datos): Observable<Venta> {
    return this.httpClient.patch<Venta>(this.apiServer + '/ventas/cambiar-estado', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarVenta(datos): Observable<Venta> {
    return this.httpClient.put<Venta>(this.apiServer + '/ventas', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerVentas(): Observable<Venta> {
    return this.httpClient.get<Venta>(this.apiServer + '/ventas', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerVentasFiltradasPorUsuarioCreador(id_usuario): Observable<Venta> {
    return this.httpClient.get<Venta>(this.apiServer + '/ventas/filtradasporusuariocreador/' + id_usuario, this.httpOptions)
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
