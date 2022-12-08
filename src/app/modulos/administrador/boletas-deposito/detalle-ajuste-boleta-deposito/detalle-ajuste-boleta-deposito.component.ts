import { Component, OnInit } from '@angular/core';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-ajuste-boleta-deposito',
  templateUrl: './detalle-ajuste-boleta-deposito.component.html',
  styleUrls: ['./detalle-ajuste-boleta-deposito.component.css']
})
export class DetalleAjusteBoletaDepositoComponent implements OnInit {

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
      this.router.navigate(['/administrador/boletas-deposito/todos-los-ajustes']);
      return;
    }
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
      numeroBoleta: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.numero_boleta,
      nombreBanco: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.nombre_banco,
      montoBoleta: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.monto_depositado,
      fechaAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.fecha_sistema_formateada,
      tipoAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.tipo_ajuste,
      montoAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.monto,
      detalleAjuste: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.detalle,
      nombreEmpleado: this.servicioBoletasDeposito.ajusteBoletaDepositoSeleccionado.nombre_empleado
    })
  }

}
