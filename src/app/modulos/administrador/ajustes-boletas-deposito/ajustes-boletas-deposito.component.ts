import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajustes-boletas-deposito',
  templateUrl: './ajustes-boletas-deposito.component.html',
  styleUrls: ['./ajustes-boletas-deposito.component.css']
})
export class AjustesBoletasDepositoComponent implements OnInit, OnDestroy {

  constructor(
    private servicioBoletasDeposito: BoletaDepositoService,
    private router: Router
  ) {

    if (!this.servicioBoletasDeposito.boletaDepositoSeleccionada) {
      this.router.navigate(['/administrador/boletas-deposito/listar']);
      return;
    }

   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.servicioBoletasDeposito.boletaDepositoSeleccionada = null;
  }

}
