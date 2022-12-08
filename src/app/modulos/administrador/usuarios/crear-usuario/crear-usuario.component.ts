import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
// import 'moment/locale/es';

declare var $: any;


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  @ViewChild('fecha_nacimiento') fecha_nacimiento:ElementRef; 
  @ViewChild('fecha_inicio_laboral') fecha_inicio_laboral:ElementRef; 

  // fecha_nacimiento:string;
  // fehca_inicio_laboral:string;

  formularioUsuario = new FormGroup({
    nombre1: new FormControl('Miguel'),
    nombre2: new FormControl('Angel'),
    apellido1: new FormControl('Archila'),
    apellido2: new FormControl('Garcia'),
    // fecha_nacimiento: new FormControl(''),
    // fecha_inicio_laboral: new FormControl(''),
    cui: new FormControl('245151781804'),
    nit: new FormControl('6516-A'),
    direccion: new FormControl('Quirigua'),
    telefono: new FormControl('55801894'),
    usuario: new FormControl('exbinario'),
    password: new FormControl('123456'),
    puesto: new FormControl('Administrador'),
    check_activo: new FormControl('true'),
  });

  constructor(
    private servicioUsuarios: UsuariosService
  ) { }

  ngOnInit(): void {
    this.configuracionDatePickers();
  }

  onSubmit(){
    // console.log(this.formularioUsuario.value);
    // console.log(this.fecha_nacimiento.nativeElement.value);
    // console.log(moment(this.fecha_nacimiento.nativeElement.value).format());

    let datos = {
      nombre1: this.formularioUsuario.controls.nombre1.value,
      nombre2: this.formularioUsuario.controls.nombre2.value,
      apellido1: this.formularioUsuario.controls.apellido1.value,
      apellido2: this.formularioUsuario.controls.apellido2.value,
      fecha_nacimiento: moment(this.fecha_nacimiento.nativeElement.value).format(),
      fecha_inicio_laboral: moment(this.fecha_inicio_laboral.nativeElement.value).format(),
      cui: this.formularioUsuario.controls.cui.value,
      nit: this.formularioUsuario.controls.nit.value,
      direccion: this.formularioUsuario.controls.direccion.value,
      telefono: this.formularioUsuario.controls.telefono.value,
      usuario: this.formularioUsuario.controls.usuario.value,
      password: this.formularioUsuario.controls.password.value,
      puesto: this.formularioUsuario.controls.puesto.value,
      esta_activo: this.formularioUsuario.controls.check_activo.value,
    }

    // console.log(datos);
    this.servicioUsuarios.crearUsuario(datos).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error de conexion');
        
      }
    )
    
    
    
  }

  configuracionDatePickers() {
    let maxDate = moment().subtract(18, 'years').unix().toString();
    let minDate = moment().subtract(60, 'years').unix().toString();
    // console.log(moment.unix(maxDate).format("YYYY/MM/DD"));

    maxDate = moment.unix(Number(maxDate)).format("YYYY/MM/DD");
    minDate = moment.unix(Number(minDate)).format("YYYY").toString();
    console.log(maxDate);


    $('#idfecha_nacimiento').datetimepicker({
      //format: 'DD/MM/YYYY'
      format: 'YYYY/MM/DD',
      minDate,
      maxDate,
      ignoreReadonly: true,
      allowInputToggle: true,
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

    $('#idfecha_nacimiento_oculta').datetimepicker({
      //format: 'DD/MM/YYYY'
      format: 'YYYY/MM/DD',
      date: moment().format("YYYY/MM/DD")
    });

    $("#idfecha_nacimiento").on("dp.change", function (e) {
      $('#idfecha_nacimiento_oculta').data("DateTimePicker").date(e.date);
    });

    $('#idfecha_inicio_laboral').datetimepicker({
      format: 'YYYY/MM/DD',
      maxDate: moment().format("YYYY/MM/DD"),
      ignoreReadonly: true,
      allowInputToggle: true,
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

    $('#idfecha_inicio_laboral_oculta').datetimepicker({
      format: 'YYYY/MM/DD',
      date:moment().format("YYYY/MM/DD")
  });

  $("#idfecha_inicio_laboral").on("dp.change", function (e) {
      $('#idfecha_inicio_laboral_oculta').data("DateTimePicker").date(e.date);
  });

  }

}
