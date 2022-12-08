import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BoletaDeposito } from 'src/app/interfaces/boleta-deposito/boleta-deposito';


@Injectable({
  providedIn: 'root'
})
export class BoletaDepositoService {

  private apiServer = environment.backendServer;
  boletaDepositoSeleccionada:any;
  ajusteBoletaDepositoSeleccionado:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearBoletaDeposito(datos): Observable<BoletaDeposito> {
    return this.httpClient.post<BoletaDeposito>(this.apiServer + '/boletas-deposito', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  crearAjusteDeBoleta(datos): Observable<BoletaDeposito> {
    return this.httpClient.post<BoletaDeposito>(this.apiServer + '/boletas-deposito/ajustes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  actualizarAjusteDeBoleta(datos): Observable<BoletaDeposito> {
    return this.httpClient.put<BoletaDeposito>(this.apiServer + '/boletas-deposito/ajustes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  anularAjusteDeBoleta(datos): Observable<BoletaDeposito> {
    return this.httpClient.patch<BoletaDeposito>(this.apiServer + '/boletas-deposito/ajustes/anular', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cerrarCuadre(datos): Observable<BoletaDeposito> {
    return this.httpClient.post<BoletaDeposito>(this.apiServer + '/boletas-deposito/cerrar-cuadre', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  gestionarTransacciones(datos): Observable<BoletaDeposito> {
    return this.httpClient.post<BoletaDeposito>(this.apiServer + '/boletas-deposito/gestionar-transacciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  actualizarBoletaDeposito(datos): Observable<BoletaDeposito> {
    return this.httpClient.put<BoletaDeposito>(this.apiServer + '/boletas-deposito', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cuadrarDepositos(datos): Observable<BoletaDeposito> {
    return this.httpClient.post<BoletaDeposito>(this.apiServer + '/boletas-deposito/cuadrar', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerBoletasDeposito(): Observable<BoletaDeposito> {
    return this.httpClient.get<BoletaDeposito>(this.apiServer + '/boletas-deposito', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerBoletasDepositoFiltradasPorUsuarioCreador(id_usuario): Observable<BoletaDeposito> {
    return this.httpClient.get<BoletaDeposito>(this.apiServer + '/boletas-deposito/filtradasporusuariocreador/' + id_usuario, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerAjustesDeBoleta(id_boleta_deposito): Observable<BoletaDeposito> {
    return this.httpClient.get<BoletaDeposito>(this.apiServer + '/boletas-deposito/ajustes/filtrar-por-idboletadeposito/' + id_boleta_deposito, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  todosLosAjustesDeBoletas(): Observable<BoletaDeposito> {
    return this.httpClient.get<BoletaDeposito>(this.apiServer + '/boletas-deposito/ajustes', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerTransaccionesSinBoletaDeposito(): Observable<BoletaDeposito> {
    return this.httpClient.get<BoletaDeposito>(this.apiServer + '/boletas-deposito/transacciones-sin-boleta-deposito', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // obtenerTransaccionesConBoletaDeposito(id_boleta_deposito): Observable<BoletaDeposito> {
  //   return this.httpClient.get<BoletaDeposito>(this.apiServer + '/boletas-deposito/transacciones-con-boleta-deposito/' + id_boleta_deposito, this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     )
  // }

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
