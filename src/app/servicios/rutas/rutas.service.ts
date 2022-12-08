import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ruta } from 'src/app/interfaces/ruta/ruta';



@Injectable({
  providedIn: 'root'
})
export class RutasService {

  private apiServer = environment.backendServer;
  rutaSeleccionada:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearRuta(datos): Observable<Ruta> {
    return this.httpClient.post<Ruta>(this.apiServer + '/rutas', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  eliminarRuta(datos): Observable<Ruta> {
    return this.httpClient.post<Ruta>(this.apiServer + '/rutas/eliminar', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  actualizarRuta(datos): Observable<Ruta> {
    return this.httpClient.put<Ruta>(this.apiServer + '/rutas', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  quitarInstalacionesDeRuta(datos): Observable<Ruta> {
    return this.httpClient.post<Ruta>(this.apiServer + '/rutas/quitar-instalaciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  agregarInstalacionesDeRuta(datos): Observable<Ruta> {
    return this.httpClient.post<Ruta>(this.apiServer + '/rutas/agregar-instalaciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  gestionarInstalacionesDeRuta(datos): Observable<Ruta> {
    return this.httpClient.post<Ruta>(this.apiServer + '/rutas/gestionar-instalaciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerRutas(): Observable<Ruta> {
    return this.httpClient.get<Ruta>(this.apiServer + '/rutas', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerRutasFiltradasPorUsuarioAsignado(id_usuario): Observable<Ruta> {
    return this.httpClient.get<Ruta>(this.apiServer + '/rutas/filtradasusuarioasignado/' + id_usuario, this.httpOptions)
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
