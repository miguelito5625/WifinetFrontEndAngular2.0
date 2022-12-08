import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoAjuste } from 'src/app/interfaces/tipoAjuste/tipo-ajuste';

@Injectable({
  providedIn: 'root'
})
export class TiposAjustesService {

  private apiServer = environment.backendServer;
  tiposAjusteSeleccionado:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearTipoAajuste(datos): Observable<TipoAjuste> {
    return this.httpClient.post<TipoAjuste>(this.apiServer + '/tipos-ajustes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarTipoAajuste(datos): Observable<TipoAjuste> {
    return this.httpClient.put<TipoAjuste>(this.apiServer + '/tipos-ajustes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  actualizarTipoAjuste(datos): Observable<TipoAjuste> {
    return this.httpClient.put<TipoAjuste>(this.apiServer + '/tipos-ajustes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerTiposAjustes(): Observable<TipoAjuste> {
    return this.httpClient.get<TipoAjuste>(this.apiServer + '/tipos-ajustes', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  eliminarTipoAjuste(id_barrio): Observable<TipoAjuste> {
    return this.httpClient.delete<TipoAjuste>(this.apiServer + '/tipos-ajustes/eliminar/'+ id_barrio, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  eliminarForzosoTipoAjuste(id_barrio): Observable<TipoAjuste> {
    return this.httpClient.delete<TipoAjuste>(this.apiServer + '/tipos-ajustes/eliminarforzoso/'+ id_barrio, this.httpOptions)
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
