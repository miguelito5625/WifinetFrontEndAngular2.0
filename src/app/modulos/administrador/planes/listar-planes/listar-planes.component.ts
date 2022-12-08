import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { PlanesService } from 'src/app/servicios/planes/planes.service';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-listar-planes',
  templateUrl: './listar-planes.component.html',
  styleUrls: ['./listar-planes.component.css']
})
export class ListarPlanesComponent implements OnInit {

  messages = {
    emptyMessage: 'No hay datos para mostrar',
    totalMessage: 'Total',
    selectedMessage: 'Seleccionado'
  };

  rows = [];
  temp = [...this.rows];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [];

  ColumnMode = ColumnMode;

  constructor(
    private servicioPlanes: PlanesService,
    private router: Router
  ) {


  }

  editarPlan(plan){
    this.servicioPlanes.planSeleccionado = plan;
    this.router.navigate(['/administrador/planes/modificar']);
  }

  ngOnInit() {
    this.cargarPlanes();
  }

  ngOnDestroy(){
    $('.tooltip').remove();
  }

  cargarPlanes() {

    Swal.fire({
      title: 'Cargando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });

    const subcribeObtenerPlanes = this.servicioPlanes.obtenerPlanes().subscribe(
      res => {
        const result: any = res;
        console.log(result.planes);

        this.rows = result.planes;
        this.temp = [...this.rows];
        subcribeObtenerPlanes.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subcribeObtenerPlanes.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (index) {
      return (index.nombre.toLowerCase().indexOf(val) !== -1 ||
      // index.velocidad_subida.toLowerCase().indexOf(val) !== -1 ||
      // index.velocidad_bajada.toLowerCase().indexOf(val) !== -1 ||
      !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
