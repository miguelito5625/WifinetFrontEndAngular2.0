import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BoletaDepositoService } from 'src/app/servicios/boleta-deposito/boleta-deposito.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { async } from '@angular/core/testing';
import { TiposAjustesService } from 'src/app/servicios/tiposAjustes/tipos-ajustes.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion/autenticacion.service';

declare var $: any;
declare var moment: any;
declare var Swal: any;

@Component({
  selector: 'app-crear-ajustes-boletas-deposito',
  templateUrl: './crear-ajustes-boletas-deposito.component.html',
  styleUrls: ['./crear-ajustes-boletas-deposito.component.css']
})
export class CrearAjustesBoletasDepositoComponent implements OnInit, AfterViewInit {

  listaDeTiposAjustes = [];

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
    private servicioTiposAjustes: TiposAjustesService,
    private router: Router,
    private servicioAutenticacion: AutenticacionService
  ) {

  }

  ngOnInit(): void {
    this.llenarFormulario();
    this.obtenerTiposAjustes();
  }

  ngAfterViewInit() {
    $('.selectpicker').selectpicker('refresh');
  }

  llenarFormulario() {
    // this.formularioAjuste.controls.fechaAjuste.setValue(moment().locale('es').format('LL'));
    this.formularioAjuste.patchValue({
      numeroBoleta: this.servicioBoletasDeposito.boletaDepositoSeleccionada.numero_boleta,
      nombreBanco: this.servicioBoletasDeposito.boletaDepositoSeleccionada.nombre_banco,
      montoBoleta: this.servicioBoletasDeposito.boletaDepositoSeleccionada.monto_depositado,
      fechaAjuste: moment().locale('es').format('LL')
    });
  }

  async onSubmit() {

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
      title: 'Creando',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const datos = {
      monto: this.formularioAjuste.value.montoAjuste,
      id_usuario: this.servicioAutenticacion.usuarioLogueado.id_usuario,
      id_boleta_deposito: this.servicioBoletasDeposito.boletaDepositoSeleccionada.id,
      detalle: this.formularioAjuste.value.detalleAjuste,
      tipo_ajuste: this.formularioAjuste.value.tipoAjuste
    };

    this.servicioBoletasDeposito.crearAjusteDeBoleta(datos).subscribe(
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

    console.log(datos);


  }

  obtenerTiposAjustes(){
    Swal.fire({
      title: 'Cargando tipos de ajustes...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    const subscribeObtener = this.servicioTiposAjustes.obtenerTiposAjustes().subscribe(
      res => {
        const result:any = res;
        this.listaDeTiposAjustes = result.tiposAjustes;
        console.log(this.listaDeTiposAjustes);
        
        subscribeObtener.unsubscribe();
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subscribeObtener.unsubscribe();
        Swal.fire({
          title: 'Error al cargar los tipos de ajustes!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )
  }

}
