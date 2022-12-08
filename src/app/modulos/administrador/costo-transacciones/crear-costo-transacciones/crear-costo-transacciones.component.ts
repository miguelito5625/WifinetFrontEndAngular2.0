import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlanesService } from 'src/app/servicios/planes/planes.service';
import { CostoTransaccionesService } from 'src/app/servicios/costo-transacciones/costo-transacciones.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

declare var moment: any;
declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-crear-costo-transacciones',
  templateUrl: './crear-costo-transacciones.component.html',
  styleUrls: ['./crear-costo-transacciones.component.css']
})
export class CrearCostoTransaccionesComponent implements OnInit, AfterViewInit {

  listaPlanes: any;

  constructor(
    private servicioPlanes: PlanesService,
    private servicioCostoTransacciones: CostoTransaccionesService,
    private router: Router,
    private servicioAutenticacion: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.obtenerPlanes();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('render');
  }

  estado: boolean = true;
  esCobroMensualidad: boolean = false;
  formularioCostoTransaccion = new FormGroup({
    tipo_transaccion: new FormControl(''),
    plan: new FormControl(''),
    costo: new FormControl(''),
    fecha_inicio: new FormControl({ value: moment().locale('es').format('L'), disabled: true }),
    check_estado: new FormControl(true)
  });

  obtenerPlanes() {
    this.servicioPlanes.obtenerPlanes().subscribe(
      res => {
        console.log(res);
        const result: any = res;
        this.listaPlanes = result.planes
      },
      err => {
        console.log(err);
      }
    )
  }

  onChangeTipoTransaccion() {
    let tipo_transaccion = this.formularioCostoTransaccion.controls.tipo_transaccion.value;
    if (tipo_transaccion === 'Cobro Mensualidad') {
      this.esCobroMensualidad = true;
      setTimeout(() => {
        $('.selectpicker').selectpicker('render');
      }, 200);
    } else {
      this.esCobroMensualidad = false;
    }
  }

  OnChangeEstado() {
    let check_estado = this.formularioCostoTransaccion.controls.check_estado.value;
    this.estado = check_estado;
  }

  onSubmit() {

    Swal.fire({
      title: 'Creando costo transacciones',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    console.log(this.formularioCostoTransaccion.value);
    let datos = this.formularioCostoTransaccion.value;

    delete datos.check_estado

    datos.id_plan = this.formularioCostoTransaccion.controls.plan.value;
    delete datos.plan;
    datos.id_usuario = this.servicioAutenticacion.usuarioLogueado.id_usuario;
    datos.comprobar = 'si';

    if (!this.esCobroMensualidad) {
      delete datos.id_plan;
    }

    console.log(datos);

    this.servicioCostoTransacciones.crearCostoTransacciones(datos).subscribe(
      async (res) => {
        console.log(res);
        const result: any = res;

        if (result.existe === 'si') {

          const mensajeReemplazar = await Swal.fire({
            icon: 'warning',
            title: result.message,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          });

          if (mensajeReemplazar.isConfirmed) {

            datos.modificar = 'si';
            delete datos.comprobar;
            datos.id_costos_transacciones = result.id_costos_transacciones;

            console.log('datos a reemplazar');
            console.log(datos);

            this.servicioCostoTransacciones.crearCostoTransacciones(datos).subscribe(
              async (res) => {

              },
              err => {
                
              }
            )

          } else {

            //regresar a la lista de costos transacciones
            this.router.navigate(['/administrador/costo-transacciones/listar']);
            return;
          }

        }


        await Swal.fire({
          title: 'Creado!',
          // text: result.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        this.router.navigate(['/administrador/costo-transacciones/listar']);

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
