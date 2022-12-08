import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DireccionesService } from 'src/app/servicios/direcciones/direcciones.service';

declare var moment:any;
declare var $:any;
declare var Swal:any;

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css']
})
export class ModificarClienteComponent implements OnInit, AfterViewInit {

  clienteSeleccionado:any;

  @ViewChild('fecha_nacimiento') fecha_nacimiento: ElementRef;

  formularioCliente = new FormGroup({
    cui: new FormControl(''),
    primer_nombre: new FormControl(''),
    segundo_nombre: new FormControl(''),
    primer_apellido: new FormControl(''),
    segundo_apellido: new FormControl(''),
    telefono: new FormControl(''),
    correo_electronico: new FormControl('')
  });

  constructor(
    private servicioClientes: ClientesService,
    private router: Router
  ) {

    if (!this.servicioClientes.clienteSeleccionado) {
      router.navigate(['/tecnicocobrador/clientes/listar']);
      return;
    }

    this.clienteSeleccionado = this.servicioClientes.clienteSeleccionado;
    }

  ngOnInit(): void {
    console.log(this.clienteSeleccionado);
    this.configuracionDatePickers();
    this.llenarFormulario();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  llenarFormulario(){
    this.formularioCliente.controls.cui.setValue(this.clienteSeleccionado.cui);
    this.formularioCliente.controls.primer_nombre.setValue(this.clienteSeleccionado.primer_nombre);
    this.formularioCliente.controls.segundo_nombre.setValue(this.clienteSeleccionado.segundo_nombre);
    this.formularioCliente.controls.primer_apellido.setValue(this.clienteSeleccionado.primer_apellido);
    this.formularioCliente.controls.segundo_apellido.setValue(this.clienteSeleccionado.segundo_apellido);
    this.formularioCliente.controls.telefono.setValue(this.clienteSeleccionado.telefono);
    this.formularioCliente.controls.correo_electronico.setValue(this.clienteSeleccionado.correo_electronico);
    // this.formularioCliente.controls.especificacion.setValue(this.clienteSeleccionado.especificacion);
  }


  async onSubmit() {

    

    if (!this.formularioCliente.valid) {
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
      title: 'Actualizando datos',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    let datos = this.formularioCliente.value;
    datos.fecha_nacimiento = moment(this.fecha_nacimiento.nativeElement.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
    datos.id_persona = this.clienteSeleccionado.id_persona;

    delete datos.departamento;
    delete datos.municipio;
    datos.id_barrio = datos.barrio;
    delete datos.barrio;

    if (this.formularioCliente.controls.cui.value !== this.clienteSeleccionado.cui) {
      datos.mismoCui = 'no';
    } 

    console.log(datos);

    this.servicioClientes.actualizarCliente(datos).subscribe(
       async (res) => {
        console.log(res);
        const result: any = res;
        
        const entendido = await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
    
        this.router.navigate(['/tecnicocobrador/clientes/listar']);
        

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
      locale: 'es',
      date: moment(this.clienteSeleccionado.fecha_nacimiento),
      icons: {
        next: 'fa fa-chevron-right',
        previous: 'fa fa-chevron-left',
      }
    });

  }
  

}
