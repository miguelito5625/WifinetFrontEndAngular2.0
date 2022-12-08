import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CostoTransacciones } from 'src/app/interfaces/costo-transacciones/costo-transacciones';


@Injectable({
  providedIn: 'root'
})
export class CostoTransaccionesService {

  private apiServer = environment.backendServer;
  costoTransaccionSeleccionado:any;
  descuentoPorReferenciaVigente:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearCostoTransacciones(datos): Observable<CostoTransacciones> {
    return this.httpClient.post<CostoTransacciones>(this.apiServer + '/costo_transacciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  verificarExiscoCostoTransaccionParaInstalacion(): Observable<CostoTransacciones> {
    return this.httpClient.post<CostoTransacciones>(this.apiServer + '/costo_transacciones/existe/instalacion', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerCostoTransacciones(): Observable<CostoTransacciones> {
    return this.httpClient.get<CostoTransacciones>(this.apiServer + '/costo_transacciones', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerCostoInstalacionVigente(): Observable<CostoTransacciones> {
    return this.httpClient.get<CostoTransacciones>(this.apiServer + '/costo_transacciones/instalacion-vigente', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerDescuentoPorReferenciaVigente(): Observable<CostoTransacciones> {
    return this.httpClient.get<CostoTransacciones>(this.apiServer + '/costo_transacciones/descuento-por-referencia-vigente', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerCostoPlanVigente(id_plan): Observable<CostoTransacciones> {
    return this.httpClient.get<CostoTransacciones>(this.apiServer + '/costo_transacciones/plan-vigente/' + id_plan, this.httpOptions)
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
