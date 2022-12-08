import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/interfaces/cliente/cliente';
import { Cobro } from 'src/app/interfaces/cobro/cobro';

@Injectable({
  providedIn: 'root'
})
export class CobrosService {

  private apiServer = environment.backendServer;
  primerPago:string;
  cobroSeleccionado:any;
  precioPlan:string;

  tieneReferencias:string;
  id_ultima_referencia:string;
  cantidadReferencias:string;
  nombre_cliente_referido:string;

  ultimoPago:any;

  cantidadDePagos:any;
  
  

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearCobro(datos): Observable<Cobro> {
    return this.httpClient.post<Cobro>(this.apiServer + '/cobros', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarCobro(datos): Observable<Cobro> {
    return this.httpClient.put<Cobro>(this.apiServer + '/cobros', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cambiarEstadoCobro(datos): Observable<Cobro> {
    return this.httpClient.patch<Cobro>(this.apiServer + '/cobros/cambiar-estado', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  anularCobro(datos): Observable<Cobro> {
    return this.httpClient.patch<Cobro>(this.apiServer + '/cobros/anular', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  comprobarPrimerPago(datos): Observable<Cobro> {
    return this.httpClient.post<Cobro>(this.apiServer + '/cobros/comprobar-primer-pago', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  comprobarReferencias(datos): Observable<Cobro> {
    return this.httpClient.post<Cobro>(this.apiServer + '/cobros/comprobar-referencias', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
 

  obtenerCobros(): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiServer + '/cobros', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerCobrosFiltradosPorUsuarioCreador(id_usuario): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiServer + '/cobros/filtradosporusuariocreador/' + id_usuario, this.httpOptions)
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
