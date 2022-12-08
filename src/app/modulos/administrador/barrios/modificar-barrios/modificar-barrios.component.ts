import { Component, OnInit } from '@angular/core';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var Swal:any;
declare var $:any;

@Component({
  selector: 'app-modificar-barrios',
  templateUrl: './modificar-barrios.component.html',
  styleUrls: ['./modificar-barrios.component.css']
})
export class ModificarBarriosComponent implements OnInit {

  constructor(
    private servicioDirecciones: DireccionesService,
    private router: Router
  ) { 
    if (!this.servicioDirecciones.barrioSeleccionado) {
      this.router.navigate(['/administrador/barrios/listar']);
      return;
    }
    console.log(this.servicioDirecciones.barrioSeleccionado);
    
  }

  listaDepartamentos = [];

  listaMunicipios = [];
  listaMunicipiosFiltrados = [];


  formularioBarrio = new FormGroup({
    departamento: new FormControl(this.servicioDirecciones.barrioSeleccionado.id_departamento, [Validators.required]),
    municipio: new FormControl(this.servicioDirecciones.barrioSeleccionado.id_municipio, [Validators.required]),
    nombreBarrio: new FormControl(this.servicioDirecciones.barrioSeleccionado.nombre_barrio, [Validators.required])
  });


  ngOnInit(): void {
    this.obtenerDepartamentos();
    console.log(this.formularioBarrio.value);
    
  }

  onSubmit(){

    if (!this.formularioBarrio.valid) {
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
     title: 'Creando',
     icon: 'info',
     html: 'Por favor, espere',
     timerProgressBar: true,
     allowOutsideClick: false,
     onBeforeOpen: () => {
       Swal.showLoading()
     }
   });

    const datos = {
      id_barrio: this.servicioDirecciones.barrioSeleccionado.id_barrio,
      id_municipio: this.formularioBarrio.controls.municipio.value,
      nombre_barrio: this.formularioBarrio.controls.nombreBarrio.value
    };
    console.log(datos);

    const subcribeCrearBarrio = this.servicioDirecciones.modificarBarrio(datos).subscribe(
      async (res) => {
        const result:any = res;
        console.log(result);
        subcribeCrearBarrio.unsubscribe();
        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        this.router.navigate(['/administrador/barrios/listar']);
      },
      err => {
        console.log(err);
        subcribeCrearBarrio.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )
    
    
  }

  obtenerDepartamentos(){
    Swal.fire({
      title: 'Cargando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    const subcripcionDepartamentos = this.servicioDirecciones.obtenerDepartamentos().subscribe(
      res => {
        const respuesta: any = res;
        this.listaDepartamentos = respuesta.departamentos;
        subcripcionDepartamentos.unsubscribe();
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          $('#selectDepartamentos').selectpicker('val', this.servicioDirecciones.barrioSeleccionado.id_departamento);
          this.obtenerMunicipios();
        }, 200);
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error al cargar los departamentos!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );

  }

  obtenerMunicipios(){
    const subcripcionMunicipios = this.servicioDirecciones.obtenerMunicipios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaMunicipios = respuesta.municipios;
        subcripcionMunicipios.unsubscribe();
        this.cambioDepartamento();
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          $('#selectMunicipios').selectpicker('val', this.servicioDirecciones.barrioSeleccionado.id_municipio);
          Swal.close();
        }, 200);
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error al cargar los municipios!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  cambioDepartamento() {
    const id_departamento = this.formularioBarrio.controls.departamento.value;

    this.listaMunicipiosFiltrados = this.listaMunicipios.filter(function (mp) {
      return mp.id_departamento == id_departamento;
    });

    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 200);

  }

}
