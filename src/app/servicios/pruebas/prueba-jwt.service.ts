import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plan } from 'src/app/interfaces/plan/plan';

@Injectable({
  providedIn: 'root'
})
export class PruebaJwtService {

  private apiServer = environment.backendServer;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  consultarAreaProtegida(): Observable<Plan> {
    return this.httpClient.get<Plan>(this.apiServer + '/pruebas/area-protegida', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  pruebaLogin(datos): Observable<Plan> {
    return this.httpClient.post<Plan>(this.apiServer + '/autenticacion/login', JSON.stringify(datos), this.httpOptions)
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
