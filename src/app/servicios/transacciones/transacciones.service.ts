import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaccion } from 'src/app/interfaces/transaccion/transaccion';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private apiServer = environment.backendServer;
  transaccionSeleccionada:any;

  

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  obtenerTransacciones(): Observable<Transaccion> {
    return this.httpClient.get<Transaccion>(this.apiServer + '/transacciones', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerTransaccionesValidasSinBoletaDeposito(): Observable<Transaccion> {
    return this.httpClient.get<Transaccion>(this.apiServer + '/transacciones/validas-sin-boleta', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  
  obtenerTransaccionesPorIdBoleta(id_boleta:string): Observable<Transaccion> {
    return this.httpClient.get<Transaccion>(this.apiServer + '/transacciones/filtrar/idboletadeposito/' + id_boleta, this.httpOptions)
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
