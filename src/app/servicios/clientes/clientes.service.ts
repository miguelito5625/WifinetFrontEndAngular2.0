import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/interfaces/cliente/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiServer = environment.backendServer;
  clienteSeleccionado:any;
  direccionSeleccionada:any;


  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  crearCliente(datos): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.apiServer + '/clientes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  agregarDireccion(datos): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.apiServer + '/clientes/direcciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  modificarDireccion(datos): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.apiServer + '/clientes/direcciones', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  cambiarEstado(datos): Observable<Cliente> {
    return this.httpClient.patch<Cliente>(this.apiServer + '/clientes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerDirecciones(id_persona): Observable<Cliente> {    
    return this.httpClient.get<Cliente>(this.apiServer + '/clientes/direcciones/' + id_persona, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  actualizarCliente(datos): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.apiServer + '/clientes', JSON.stringify(datos), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerClientes(): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiServer + '/clientes', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  obtenerClientesPorEstado(estado): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiServer + '/clientes/' + estado, this.httpOptions)
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
