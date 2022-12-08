import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TiposAjustesService } from 'src/app/servicios/tiposAjustes/tipos-ajustes.service';
import { async } from 'rxjs/internal/scheduler/async';

declare var Swal: any;


@Component({
  selector: 'app-crear-tipos-ajustes',
  templateUrl: './crear-tipos-ajustes.component.html',
  styleUrls: ['./crear-tipos-ajustes.component.css']
})
export class CrearTiposAjustesComponent implements OnInit {

  formularioTipoAjuste = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor(
    private servicioTiposAjustes: TiposAjustesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){

    if (!this.formularioTipoAjuste.valid) {
      Swal.fire({
       icon: 'error',
       title: 'Hay campos incorrectos',
       text: 'Por favor llene cada campo correctamente',
       showCloseButton: true,
       // showCancelButton: true,
       confirmButtonText: 'Entedido',
     });
     return;
   }

   Swal.fire({
     title: 'Creando...',
     icon: 'info',
     html: 'Por favor, espere',
     timerProgressBar: true,
     allowOutsideClick: false,
     onBeforeOpen: () => {
       Swal.showLoading()
     }
   });

    const data =  this.formularioTipoAjuste.value;
    const subscribeCrear = this.servicioTiposAjustes.crearTipoAajuste(data).subscribe(
      async (res) => {
        const result:any = res;
        console.log(result);

        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        this.router.navigate(['/administrador/tipos-ajustes/listar']);     
        subscribeCrear.unsubscribe();   
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeCrear.unsubscribe();
      }
    )
  }

}
