import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransaccionesInstalacionesService } from 'src/app/servicios/transacciones-instalaciones/transacciones-instalaciones.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

declare var moment: any;

@Component({
  selector: 'app-detalles-transacciones-instalaciones',
  templateUrl: './detalles-transacciones-instalaciones.component.html',
  styleUrls: ['./detalles-transacciones-instalaciones.component.css']
})
export class DetallesTransaccionesInstalacionesComponent implements OnInit, OnDestroy {

  instalacionSeleccionada: any;

  formularioInstalacion = new FormGroup({
    nombre_cliente: new FormControl(''),
    nombre_plan: new FormControl(''),
    ip_asignada: new FormControl(''),
    nombre_queue: new FormControl(''),
    estado: new FormControl(''),
    fecha_alta_real: new FormControl(''),
    fecha_alta: new FormControl(''),
    fecha_baja: new FormControl(''),
    direccion: new FormControl(''),
    coordenadas: new FormControl(''),
    detalle: new FormControl(''),
    mes_gratis: new FormControl(''),
    referencia: new FormControl(''),
    numero_factura: new FormControl(''),
    numero_recibo: new FormControl('')
  });

  constructor(
    private servicioTransaccionesInstalaciones: TransaccionesInstalacionesService,
    private router: Router
  ) {

    if (!this.servicioTransaccionesInstalaciones.instalacionSeleccionada) {
      router.navigate(['/administrador/transacciones-instalaciones/listar']);
      return;
    }
    this.instalacionSeleccionada = this.servicioTransaccionesInstalaciones.instalacionSeleccionada;
    console.log(this.servicioTransaccionesInstalaciones.instalacionSeleccionada);


  }

  ngOnInit(): void {
    this.llenarFormulario();
  }

  ngOnDestroy(){
    this.servicioTransaccionesInstalaciones.instalacionSeleccionada = null;
  }

  llenarFormulario() {
    const direccion = `${this.instalacionSeleccionada.especificacion_direccion}, ${this.instalacionSeleccionada.barrio}, ${this.instalacionSeleccionada.municipio}, ${this.instalacionSeleccionada.departamento}`
    const coordenadas = `${this.instalacionSeleccionada.latitud}, ${this.instalacionSeleccionada.longitud}`;
    const fecha_alta_real = moment(this.instalacionSeleccionada.fecha_alta_real).locale('es').format('LL');
    const fecha_alta = moment(this.instalacionSeleccionada.fecha_alta).locale('es').format('LL');
    const fecha_baja = this.instalacionSeleccionada.fecha_baja ? moment(this.instalacionSeleccionada.fecha_baja).locale('es').format('LL') : '';
    const referencia = this.instalacionSeleccionada.nombre_cliente_refirio?this.instalacionSeleccionada.nombre_cliente_refirio:'Sin referencias';

    this.formularioInstalacion.controls.nombre_cliente.setValue(this.instalacionSeleccionada.nombre_cliente);
    this.formularioInstalacion.controls.nombre_plan.setValue(this.instalacionSeleccionada.nombre_plan);
    this.formularioInstalacion.controls.ip_asignada.setValue(this.instalacionSeleccionada.ip_asignada);
    this.formularioInstalacion.controls.nombre_queue.setValue(this.instalacionSeleccionada.nombre_queue);
    this.formularioInstalacion.controls.estado.setValue(this.instalacionSeleccionada.estado);
    this.formularioInstalacion.controls.fecha_alta_real.setValue(fecha_alta_real);
    this.formularioInstalacion.controls.fecha_alta.setValue(fecha_alta);
    this.formularioInstalacion.controls.fecha_baja.setValue(fecha_baja);
    this.formularioInstalacion.controls.direccion.setValue(direccion);
    this.formularioInstalacion.controls.coordenadas.setValue(coordenadas);
    this.formularioInstalacion.controls.detalle.setValue(this.instalacionSeleccionada.detalle);
    this.formularioInstalacion.controls.mes_gratis.setValue(this.instalacionSeleccionada.primer_mes_gratis);
    this.formularioInstalacion.controls.referencia.setValue(referencia);
    
    this.formularioInstalacion.controls.numero_factura.setValue(this.instalacionSeleccionada.numero_factura);
    this.formularioInstalacion.controls.numero_recibo.setValue(this.instalacionSeleccionada.numero_recibo);


  }

  abrirGoogleMaps() {
    const coordenadas = `${this.instalacionSeleccionada.latitud},${this.instalacionSeleccionada.longitud}`;
    let url = `http://maps.google.com/maps?q=${coordenadas}`
    window.open(url, "_blank");
  }

}
