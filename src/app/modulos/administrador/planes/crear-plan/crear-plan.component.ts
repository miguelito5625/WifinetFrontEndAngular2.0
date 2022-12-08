import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanesService } from 'src/app/servicios/planes/planes.service';
import { Router } from '@angular/router';

declare var Swal: any;


@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {

  formularioPlan = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    velocidad_subida: new FormControl('', [Validators.required]),
    velocidad_bajada: new FormControl('', [Validators.required])
  });


  constructor(
    private servicioPlanes: PlanesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (!this.formularioPlan.valid) {
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
      title: 'Creando plan',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioPlan.value;

    console.log(datos);

    this.servicioPlanes.crearPlan(datos).subscribe(
       async (res) => {
        console.log(res);
        const result: any = res;
        
        const darDeBaja = await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });

        this.router.navigate(['/administrador/planes/listar']);

      },
      err => {
        console.log(err);

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

      }
    );

  }


}
