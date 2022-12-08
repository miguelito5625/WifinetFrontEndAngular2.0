import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/servicios/planes/planes.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';

declare var Swal:any;

@Component({
  selector: 'app-modificar-plan',
  templateUrl: './modificar-plan.component.html',
  styleUrls: ['./modificar-plan.component.css']
})
export class ModificarPlanComponent implements OnInit {

  planSeleccionado:any;

  formularioPlan = new FormGroup({
    nombre: new FormControl(''),
    velocidad_subida: new FormControl(''),
    velocidad_bajada: new FormControl('')
  });


  constructor(
    private servicioPlanes: PlanesService,
    private router: Router
  ) { 
    
    if (!this.servicioPlanes.planSeleccionado) {
      router.navigate(['/administrador/planes/listar']);
      return;
    }

    this.planSeleccionado = this.servicioPlanes.planSeleccionado;
  }

  ngOnInit(): void {
    console.log(this.servicioPlanes.planSeleccionado);
    this.llenarFormulario();
  }

  llenarFormulario(){
    this.formularioPlan.controls.nombre.setValue(this.planSeleccionado.nombre);
    this.formularioPlan.controls.velocidad_subida.setValue(this.planSeleccionado.velocidad_subida);
    this.formularioPlan.controls.velocidad_bajada.setValue(this.planSeleccionado.velocidad_bajada);
  }

  onSubmit(){

    Swal.fire({
      title: 'Actualizando datos',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioPlan.value;
    datos.id_plan = this.planSeleccionado.id;
    console.log(datos);

    this.servicioPlanes.actualizarPlan(datos).subscribe(
      async (res) => {
        const result:any = res;

        await Swal.fire({
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
    )
    
  }

}
