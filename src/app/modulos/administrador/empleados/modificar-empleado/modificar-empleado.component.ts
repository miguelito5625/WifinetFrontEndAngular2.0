import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { Router } from '@angular/router';

declare var $: any;
declare var Swal: any;
declare var moment: any;


@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.css']
})
export class ModificarEmpleadoComponent implements OnInit, AfterViewInit, OnDestroy {

  empleadoAModificar: any;

  @ViewChild('fecha_nacimiento') fecha_nacimiento: ElementRef;
  @ViewChild('fecha_alta') fecha_alta: ElementRef;
  // estado = "Activo";

  listaDepartamentos: Array<any> = [];

  listaMunicipios: Array<any> = [];
  listaMunicipiosFiltrados: Array<any> = [];

  listaBarrios: Array<any> = [];
  listaBarriosFiltrados: Array<any> = [];

  formularioEmpleado = new FormGroup({
    cui: new FormControl('', [Validators.required]),
    primer_nombre: new FormControl('', [Validators.required]),
    segundo_nombre: new FormControl('', [Validators.required]),
    primer_apellido: new FormControl('', [Validators.required]),
    segundo_apellido: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    barrio: new FormControl('', [Validators.required]),
    especificacion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    correo_electronico: new FormControl(''),
    licencia_conducir: new FormControl('', [Validators.required]),
    salario: new FormControl('', [Validators.required]),
    puesto: new FormControl('', [Validators.required]),
    // check_estado: new FormControl(false),
  });

  constructor(
    private servicioEmpleados: EmpleadosService,
    private servicioDirecciones: DireccionesService,
    private router: Router
  ) {
    if (!this.servicioEmpleados.empleadoAModificar) {
      this.router.navigate(['/administrador/empleados/listar']);
    }
  }


  ngOnInit(): void {



    this.empleadoAModificar = this.servicioEmpleados.empleadoAModificar;
    console.log(this.empleadoAModificar);
    this.configuracionDatePickers();
    this.cargarDatosDireccion();
    this.rellenarFormulario();
  }

  rellenarFormulario() {
    this.formularioEmpleado.controls.cui.setValue(this.empleadoAModificar.cui);
    this.formularioEmpleado.controls.primer_nombre.setValue(this.empleadoAModificar.primer_nombre);
    this.formularioEmpleado.controls.segundo_nombre.setValue(this.empleadoAModificar.segundo_nombre);
    this.formularioEmpleado.controls.primer_apellido.setValue(this.empleadoAModificar.primer_apellido);
    this.formularioEmpleado.controls.segundo_apellido.setValue(this.empleadoAModificar.segundo_apellido);

    this.formularioEmpleado.controls.especificacion.setValue(this.empleadoAModificar.especificacion);
    this.formularioEmpleado.controls.telefono.setValue(this.empleadoAModificar.telefono);
    this.formularioEmpleado.controls.correo_electronico.setValue(this.empleadoAModificar.correo_electronico);
    this.formularioEmpleado.controls.correo_electronico.setValue(this.empleadoAModificar.correo_electronico);
    this.formularioEmpleado.controls.licencia_conducir.setValue(this.empleadoAModificar.licencia_conducir);
    this.formularioEmpleado.controls.salario.setValue(this.empleadoAModificar.salario);
    this.formularioEmpleado.controls.puesto.setValue(this.empleadoAModificar.puesto);


  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
    $('#selectPuesto').selectpicker('val', this.empleadoAModificar.puesto);
  }

  ngOnDestroy() {
    this.servicioEmpleados.empleadoAModificar = [];
  }

  onKeyUpCui() {
    let cui = this.formularioEmpleado.controls.cui.value;
    this.formularioEmpleado.controls.licencia_conducir.setValue(cui);
  }

  // OnChangeEstadoEmpleado() {
  //   let check_estado = this.formularioEmpleado.controls.check_estado.value;
  //   console.log(check_estado);
  //   if (check_estado) {
  //     this.estado = "Activo"
  //   } else {
  //     this.estado = "Inactivo"
  //   }
  // }

  async onSubmit() {    

    if (!this.formularioEmpleado.valid) {
      await Swal.fire({
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
      title: 'Creando empleado',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioEmpleado.value;
    console.log(datos);
    
    datos.fecha_nacimiento = moment(this.fecha_nacimiento.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    datos.fecha_alta = moment(this.fecha_alta.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    // datos.estado = this.estado;
    datos.id_persona = this.empleadoAModificar.id_persona;
    delete datos.check_estado;
    delete datos.departamento;
    delete datos.municipio;
    datos.id_barrio = datos.barrio;
    delete datos.barrio;
    datos.id_direccion = this.empleadoAModificar.id_direccion;

    if (this.formularioEmpleado.controls.cui.value !== this.empleadoAModificar.cui) {
      datos.mismoCui = 'no';
    } 

    console.log(datos);

    this.servicioEmpleados.modificarEmpleado(datos).subscribe(
      async (res) => {
        console.log(res);
        const result: any = res;
        await Swal.fire({
          title: 'Modificado!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/administrador/empleados/listar']);

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

  configuracionDatePickers() {

    $('#idfecha_nacimiento').datetimepicker({
      format: 'DD/MM/YYYY',
      minDate: moment().subtract(60, 'years'),
      maxDate: moment().subtract(18, 'years'),
      ignoreReadonly: true,
      allowInputToggle: true,
      date: moment(this.empleadoAModificar.fecha_nacimiento, 'YYYY-MM-DD'),
      locale: 'es',
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

    $('#idfecha_alta').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: moment(),
      ignoreReadonly: true,
      allowInputToggle: true,
      date: moment(this.empleadoAModificar.fecha_alta, 'YYYY-MM-DD'),
      locale: 'es',
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }

  cargarDatosDireccion() {

    const subcripcionDepartamentos = this.servicioDirecciones.obtenerDepartamentos().subscribe(
      res => {
        const respuesta: any = res;
        this.listaDepartamentos = respuesta.departamentos;

        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
          $('#selectDepartamento').selectpicker('val', this.empleadoAModificar.id_departamento);
          this.formularioEmpleado.controls.departamento.setValue(this.empleadoAModificar.id_departamento);
          this.cambioDepartamento();

          setTimeout(() => {
            $('#selectMunicipio').selectpicker('val', this.empleadoAModificar.id_municipio);
            this.formularioEmpleado.controls.municipio.setValue(this.empleadoAModificar.id_municipio);
            this.cambioMunicipio();
            setTimeout(() => {
              $('#selectBarrio').selectpicker('val', this.empleadoAModificar.id_barrio);
              this.formularioEmpleado.controls.barrio.setValue(this.empleadoAModificar.id_barrio);
            }, 200);
          }, 200);
          
          subcripcionDepartamentos.unsubscribe();
        }, 200);

      },
      err => {
        console.log(err);
      }
    );

    const subcripcionMunicipios = this.servicioDirecciones.obtenerMunicipios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaMunicipios = respuesta.municipios;
        subcripcionMunicipios.unsubscribe();
      },
      err => {
        console.log(err);
      }
    );

    const subcripcionBarrios = this.servicioDirecciones.obtenerBarrios().subscribe(
      res => {
        const respuesta: any = res;
        this.listaBarrios = respuesta.barrios;
        subcripcionBarrios.unsubscribe();
      },
      err => {
        console.log(err);
      }
    );


  }

  cambioDepartamento() {
    const id_departamento = this.formularioEmpleado.controls.departamento.value;
    // console.log(id_departamento);
    

    this.listaMunicipiosFiltrados = this.listaMunicipios.filter(function (mp) {
      return mp.id_departamento == id_departamento;
    });

    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 200);

  }

  cambioMunicipio() {
    const id_municipio = this.formularioEmpleado.controls.municipio.value;
    this.listaBarriosFiltrados = this.listaBarrios.filter(function (br) {
      return br.id_municipio == id_municipio;
    });
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 200);

  }


}
