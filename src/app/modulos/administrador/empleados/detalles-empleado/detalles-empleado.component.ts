import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { EmpleadosService } from 'src/app/servicios/empleados/empleados.service';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';
import { Router } from '@angular/router';

declare var $:any;
declare var Swal:any;

@Component({
  selector: 'app-detalles-empleado',
  templateUrl: './detalles-empleado.component.html',
  styleUrls: ['./detalles-empleado.component.css']
})
export class DetallesEmpleadoComponent implements OnInit, AfterViewInit, OnDestroy {

  empleadoAModificar:any;

  @ViewChild('fecha_nacimiento') fecha_nacimiento: ElementRef;
  @ViewChild('fecha_alta') fecha_alta: ElementRef;
  estado = "Inactivo";

  listaDepartamentos: Array<any> = [];

  listaMunicipios: Array<any> = [];
  listaMunicipiosFiltrados: Array<any> = [];

  listaBarrios: Array<any> = [];
  listaBarriosFiltrados: Array<any> = [];

  formularioEmpleado = new FormGroup({
    cui: new FormControl(''),
    primer_nombre: new FormControl(''),
    segundo_nombre: new FormControl(''),
    primer_apellido: new FormControl(''),
    segundo_apellido: new FormControl(''),
    departamento: new FormControl(''),
    municipio: new FormControl(''),
    barrio: new FormControl(''),
    especificacion: new FormControl(''),
    telefono: new FormControl(''),
    correo_electronico: new FormControl(''),
    licencia_conducir: new FormControl(''),
    salario: new FormControl(''),
    puesto: new FormControl(''),
    estado: new FormControl(false),
  });

  constructor(
    private servicioEmpleados: EmpleadosService,
    private servicioDirecciones: DireccionesService,
    private router: Router
  ) {

    }


  ngOnInit(): void {
    this.empleadoAModificar = this.servicioEmpleados.empleadoAModificar;
    this.configuracionDatePickers();
    this.cargarDatosDireccion();
    this.rellenarFormulario();
  }

  rellenarFormulario(){
    this.formularioEmpleado.controls.cui.setValue(this.empleadoAModificar.cui);
    this.formularioEmpleado.controls.primer_nombre.setValue(this.empleadoAModificar.primer_nombre);
    this.formularioEmpleado.controls.segundo_nombre.setValue(this.empleadoAModificar.segundo_nombre);
    this.formularioEmpleado.controls.primer_apellido.setValue(this.empleadoAModificar.primer_apellido);
    this.formularioEmpleado.controls.segundo_apellido.setValue(this.empleadoAModificar.segundo_apellido);

    this.formularioEmpleado.controls.departamento.setValue(this.empleadoAModificar.departamento);
    this.formularioEmpleado.controls.municipio.setValue(this.empleadoAModificar.municipio);
    this.formularioEmpleado.controls.barrio.setValue(this.empleadoAModificar.barrio);
    

    this.formularioEmpleado.controls.especificacion.setValue(this.empleadoAModificar.especificacion);
    this.formularioEmpleado.controls.telefono.setValue(this.empleadoAModificar.telefono);
    this.formularioEmpleado.controls.correo_electronico.setValue(this.empleadoAModificar.correo_electronico);
    this.formularioEmpleado.controls.correo_electronico.setValue(this.empleadoAModificar.correo_electronico);
    this.formularioEmpleado.controls.licencia_conducir.setValue(this.empleadoAModificar.licencia_conducir);
    this.formularioEmpleado.controls.salario.setValue(this.empleadoAModificar.salario);

    this.formularioEmpleado.controls.puesto.setValue(this.empleadoAModificar.puesto);
    this.formularioEmpleado.controls.estado.setValue(this.empleadoAModificar.estado);



  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  ngOnDestroy(){
    this.servicioEmpleados.empleadoAModificar = [];
  }

  onKeyUpCui() {
    let cui = this.formularioEmpleado.controls.cui.value;
    this.formularioEmpleado.controls.licencia_conducir.setValue(cui);
  }

  OnChangeEstadoEmpleado() {
    let check_estado = this.formularioEmpleado.controls.check_estado.value;
    console.log(check_estado);
    if (check_estado) {
      this.estado = "Activo"
    } else {
      this.estado = "Inactivo"
    }
  }

  onSubmit() {

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

    datos.fecha_nacimiento = moment(this.fecha_nacimiento.nativeElement.value).format("YYYY-MM-DD");
    datos.fecha_alta = moment(this.fecha_alta.nativeElement.value).format("YYYY-MM-DD");
    datos.estado = this.estado;
    datos.id_persona = this.empleadoAModificar.id_persona;
    delete datos.check_estado;
    delete datos.departamento;
    delete datos.municipio;
    datos.id_barrio = datos.barrio;
    delete datos.barrio;

    // console.log(datos);

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
    let maxDate = moment().subtract(18, 'years').unix().toString();
    let minDate = moment().subtract(60, 'years').unix().toString();

    maxDate = moment.unix(Number(maxDate)).format("YYYY/MM/DD");
    minDate = moment.unix(Number(minDate)).format("YYYY").toString();
    console.log(maxDate);


    $('#idfecha_nacimiento').datetimepicker({
      format: 'YYYY/MM/DD',
      minDate,
      maxDate,
      ignoreReadonly: true,
      allowInputToggle: true,
      date: this.empleadoAModificar.fecha_nacimiento,
      locale: 'es',
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

    $("#idfecha_nacimiento").prop('disabled', true);


    $('#idfecha_alta').datetimepicker({
      format: 'YYYY/MM/DD',
      maxDate: moment().format("YYYY/MM/DD"),
      ignoreReadonly: true,
      allowInputToggle: true,
      date: this.empleadoAModificar.fecha_alta,
      locale: 'es',
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

    $("#idfecha_alta").prop('disabled', true);

  }

  cargarDatosDireccion() {

    const subcripcionDepartamentos = this.servicioDirecciones.obtenerDepartamentos().subscribe(
      res => {
        const respuesta: any = res;
        this.listaDepartamentos = respuesta.departamentos;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
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
