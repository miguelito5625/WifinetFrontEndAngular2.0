import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TransaccionesInstalaciones } from 'src/app/interfaces/transacciones-instalaciones/transacciones-instalaciones';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesInstalacionesService {
  private apiServer = environment.backendServer;
  instalacionSeleccionada:any;
  instalacionReferida:boolean;
  clienteQueRefirio:any;

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearInstalacion(datos): Observable<TransaccionesInstalaciones> {
    return this.httpClient.post<TransaccionesInstalaciones>(this.apiServer + '/instalaciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  crearInstalacionReferida(datos): Observable<TransaccionesInstalaciones> {
    return this.httpClient.post<TransaccionesInstalaciones>(this.apiServer + '/instalaciones/referidas', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarInstalacion(datos): Observable<TransaccionesInstalaciones> {
    return this.httpClient.put<TransaccionesInstalaciones>(this.apiServer + '/instalaciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  darDeBaja(datos): Observable<TransaccionesInstalaciones> {
    return this.httpClient.patch<TransaccionesInstalaciones>(this.apiServer + '/instalaciones/dardebaja', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerInstalaciones(): Observable<TransaccionesInstalaciones> {
    return this.httpClient.get<TransaccionesInstalaciones>(this.apiServer + '/instalaciones', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerInstalacionesFiltradasPorUsuarioCreador(id_usuario): Observable<TransaccionesInstalaciones> {
    return this.httpClient.get<TransaccionesInstalaciones>(this.apiServer + '/instalaciones/filtradasporusuariocreador/' + id_usuario, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerInstalacionesActivasSinRuta(): Observable<TransaccionesInstalaciones> {
    return this.httpClient.get<TransaccionesInstalaciones>(this.apiServer + '/instalaciones/activas/sin-ruta', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerInstalacionesPorClienteEstado(estado:string, id_cliente:string): Observable<TransaccionesInstalaciones> {
    return this.httpClient.get<TransaccionesInstalaciones>(this.apiServer + '/instalaciones/filtrar/estado-idcliente/' + estado + '/' + id_cliente, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerInstalacionesPorIdRuta(id_ruta:string): Observable<TransaccionesInstalaciones> {
    return this.httpClient.get<TransaccionesInstalaciones>(this.apiServer + '/instalaciones/filtrar/idruta/' + id_ruta, this.httpOptions)
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
