import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var Swal:any;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionInterceptorService {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // console.log('Impresion desde interceptor:');
        // console.log('estado:',err.status);
        // console.log('Error desde interceptor:');
        // console.log(err.error);
            
        if (err.status === 401 || err.status === 403 ) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']).then(() => {
            Swal.fire({
              title: 'Error!',
              text: err.error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
        }

        return throwError( err );

      })
    );
  }  
}
