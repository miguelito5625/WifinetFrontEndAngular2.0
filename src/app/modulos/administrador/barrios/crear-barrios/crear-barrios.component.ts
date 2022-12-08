import { Component, OnInit } from '@angular/core';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';

declare var Swal:any;
declare var $:any;

@Component({
  selector: 'app-crear-barrios',
  templateUrl: './crear-barrios.component.html',
  styleUrls: ['./crear-barrios.component.css']
})
export class CrearBarriosComponent implements OnInit {

  listaDepartamentos = [];

  listaMunicipios = [];
  listaMunicipiosFiltrados = [];


  formularioBarrio = new FormGroup({
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    nombreBarrio: new FormControl('', [Validators.required])
  });

  constructor(
    private servicioDirecciones: DireccionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerDepartamentos();
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

    console.log(this.formularioBarrio.value);

    const datos = {
      id_municipio: this.formularioBarrio.controls.municipio.value,
      nombre_barrio: this.formularioBarrio.controls.nombreBarrio.value
    };
    console.log(datos);

    const subcribeCrearBarrio = this.servicioDirecciones.crearBarrio(datos).subscribe(
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
        this.obtenerMunicipios();
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error al cargar los Departamentos!',
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
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          Swal.close();
        }, 200);
      },
      err => {
        console.log(err);
        Swal.fire({
          title: 'Error al cargar los Municipios!',
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
