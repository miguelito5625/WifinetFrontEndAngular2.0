import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/interfaces/cliente/cliente';
import { Prueba } from 'src/app/interfaces/prueba/prueba';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  private apiServer = environment.backendServer;
  


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  subirArchivo(datos): Observable<Prueba> {
    return this.httpClient.post<Prueba>(this.apiServer + '/pruebas', datos)
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
