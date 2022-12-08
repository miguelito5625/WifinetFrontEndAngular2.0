import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plan } from 'src/app/interfaces/plan/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private apiServer = environment.backendServer;
  planSeleccionado:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearPlan(datos): Observable<Plan> {
    return this.httpClient.post<Plan>(this.apiServer + '/planes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  actualizarPlan(datos): Observable<Plan> {
    return this.httpClient.put<Plan>(this.apiServer + '/planes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerPlanes(): Observable<Plan> {
    return this.httpClient.get<Plan>(this.apiServer + '/planes', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerPlanesConCostoTransaccion(): Observable<Plan> {
    return this.httpClient.get<Plan>(this.apiServer + '/planes/con-costo-transaccion', this.httpOptions)
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
