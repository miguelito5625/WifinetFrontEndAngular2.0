import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-ajustes-boletas-deposito',
  templateUrl: './detalle-ajustes-boletas-deposito.component.html',
  styleUrls: ['./detalle-ajustes-boletas-deposito.component.css']
})
export class DetalleAjustesBoletasDepositoComponent implements OnInit, OnDestroy {

  formularioAjuste = new FormGroup({
    numeroBoleta: new FormControl(''),
    nombreBanco: new FormControl(''),
    montoBoleta: new FormControl(''),
    fechaAjuste: new FormControl(''),
    tipoAjuste: new FormControl(''),
    montoAjuste: new FormControl(''),
    detalleAjuste: new FormControl(''),
    nombreEmpleado: new FormControl('')
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
      detalleAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.detalle,
      nombreEmpleado: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.nombre_empleado
    })
  }

}
