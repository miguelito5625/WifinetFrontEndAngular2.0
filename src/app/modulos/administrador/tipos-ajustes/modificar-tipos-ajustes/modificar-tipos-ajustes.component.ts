import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TiposAjustesService } from 'src/app/servicios/tiposAjustes/tipos-ajustes.service';

declare var Swal:any;

@Component({
  selector: 'app-modificar-tipos-ajustes',
  templateUrl: './modificar-tipos-ajustes.component.html',
  styleUrls: ['./modificar-tipos-ajustes.component.css']
})
export class ModificarTiposAjustesComponent implements OnInit, OnDestroy {

  formularioTipoAjuste = new FormGroup({
    nombre: new FormControl('', [Validators.required])
  });

  constructor(
    private servicioTiposAjustes: TiposAjustesService,
    private router: Router
  ) {
    if (!this.servicioTiposAjustes.tiposAjusteSeleccionado) {
      this.router.navigate(['/administrador/tipos-ajustes/listar']);
      return;
    }
    console.log(this.servicioTiposAjustes.tiposAjusteSeleccionado);
    
   }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  ngOnDestroy(){
    this.servicioTiposAjustes.tiposAjusteSeleccionado = null;
  }

  llenarFormulario(){
    this.formularioTipoAjuste.patchValue({
      nombre: this.servicioTiposAjustes.tiposAjusteSeleccionado.nombre
    });
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

    const data =  {
      nombre: this.formularioTipoAjuste.value.nombre,
      id_tipo_ajuste: this.servicioTiposAjustes.tiposAjusteSeleccionado.id
    };
    const subscribeCrear = this.servicioTiposAjustes.modificarTipoAajuste(data).subscribe(
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
