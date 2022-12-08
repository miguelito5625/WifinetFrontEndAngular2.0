import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plan } from 'src/app/interfaces/plan/plan';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiServer = environment.backendServer;
  usuarioLogueado:any;


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    const token: string = localStorage.getItem('token');
    if (token) {
      this.usuarioLogueado = jwt_decode(token);
    }
   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  iniciarSesion(datos): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/autenticacion/login', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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
