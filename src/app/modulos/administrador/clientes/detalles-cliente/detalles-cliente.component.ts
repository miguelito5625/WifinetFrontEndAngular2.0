import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { Router } from '@angular/router';

declare var moment:any;

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {

  clienteSeleccionado:any;

  formularioCliente = new FormGroup({
    cui: new FormControl(''),
    primer_nombre: new FormControl(''),
    segundo_nombre: new FormControl(''),
    primer_apellido: new FormControl(''),
    segundo_apellido: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    telefono: new FormControl(''),
    correo_electronico: new FormControl('')
  });

  constructor(
    private servicioClientes: ClientesService,
    private router: Router
  ) {

    if (!this.servicioClientes.clienteSeleccionado) {
      router.navigate(['/administrador/clientes/listar']);
      return;
    }

    this.clienteSeleccionado = this.servicioClientes.clienteSeleccionado;
   }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  llenarFormulario(){
    this.formularioCliente.controls.cui.setValue(this.clienteSeleccionado.cui);
    this.formularioCliente.controls.primer_nombre.setValue(this.clienteSeleccionado.primer_nombre);
    this.formularioCliente.controls.segundo_nombre.setValue(this.clienteSeleccionado.segundo_nombre);
    this.formularioCliente.controls.primer_apellido.setValue(this.clienteSeleccionado.primer_apellido);
    this.formularioCliente.controls.segundo_apellido.setValue(this.clienteSeleccionado.segundo_apellido);
    this.formularioCliente.controls.fecha_nacimiento.setValue(moment(this.clienteSeleccionado.fecha_nacimiento).format('DD/MM/YYYY'));
    this.formularioCliente.controls.telefono.setValue(this.clienteSeleccionado.telefono);
    this.formularioCliente.controls.correo_electronico.setValue(this.clienteSeleccionado.correo_electronico);
  }

}
