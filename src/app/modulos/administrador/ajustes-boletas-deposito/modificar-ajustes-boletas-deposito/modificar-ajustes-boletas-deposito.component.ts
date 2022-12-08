import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';

declare var $:any
declare var Swal:any

@Component({
  selector: 'app-modificar-ajustes-boletas-deposito',
  templateUrl: './modificar-ajustes-boletas-deposito.component.html',
  styleUrls: ['./modificar-ajustes-boletas-deposito.component.css']
})
export class ModificarAjustesBoletasDepositoComponent implements OnInit, AfterViewInit, OnDestroy {


  formularioAjuste = new FormGroup({
    numeroBoleta: new FormControl(''),
    nombreBanco: new FormControl(''),
    montoBoleta: new FormControl(''),
    fechaAjuste: new FormControl(''),
    tipoAjuste: new FormControl(''),
    montoAjuste: new FormControl(''),
    detalleAjuste: new FormControl('')
  });

  constructor(
    private servicioBoletasDeposito: BoletaDepositoService,
    private router: Router
  ) {
    if (!this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado) {
      this.router.navigate(['/administrador/boletas-deposito/listar']);
      return;
    }
    console.log('ajuste de boleta seleccionado:');
    
    console.log(this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado);

  }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('refresh');
    $('#selectTipoAjuste').selectpicker('val', this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.tipo_ajuste);
  }

  ngOnDestroy(){
    this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado = null;
  }

  llenarFormulario() {
    this.formularioAjuste.patchValue({
      numeroBoleta: this.servicioBoletasDeposito.boletaDepositoSeleccionada.numero_boleta,
      nombreBanco: this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_banco,
      montoBoleta: this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado,
      fechaAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.fecha_sistema_formateada,
      tipoAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.tipo_ajuste,
      montoAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.monto,
      detalleAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.detalle
    })
  }

  async onSubmit(){

    if (!this.formularioAjuste.valid) {
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
      title: 'Actualizando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    
    const datos = {
      id_ajuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.id_ajuste,
      monto: this.formularioAjuste.value.montoAjuste,
      tipo_ajuste: this.formularioAjuste.value.tipoAjuste,
      detalle: this.formularioAjuste.value.detalleAjuste
    };

    this.servicioBoletasDeposito.actualizarAjusteDeBoleta(datos).subscribe(
      async (res) => {
        const result:any = res;
        console.log(result);
        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          confirmButtonText: 'Aceptar',
        });
        this.router.navigate(['/administrador/ajustes-boletas-deposito/listar']);
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
