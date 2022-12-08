import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TiposAjustesService } from 'src/app/servicios/tiposAjustes/tipos-ajustes.service';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-listar-tipos-ajustes',
  templateUrl: './listar-tipos-ajustes.component.html',
  styleUrls: ['./listar-tipos-ajustes.component.css']
})
export class ListarTiposAjustesComponent implements OnInit, OnDestroy {

  @ViewChild('filtroTexto') filtroTexto: ElementRef;


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
    private servicioTiposAjustes: TiposAjustesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerTiposAjustes();
  }

  ngOnDestroy() {
    $('.tooltip').remove();
  }

  modifcarTipoAjuste(tiposAjuste){
    this.servicioTiposAjustes.tiposAjusteSeleccionado = tiposAjuste;
    this.router.navigate(['/administrador/tipos-ajustes/modificar']);
  }

  obtenerTiposAjustes(){
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
    const subscribeObtener = this.servicioTiposAjustes.obtenerTiposAjustes().subscribe(
      res => {
        const result:any = res;
        this.rows = result.tiposAjustes;
        console.log(this.rows);
        
        this.temp = [...this.rows];
        subscribeObtener.unsubscribe();
        $('.tooltip').remove();
        setTimeout(() => {
          $(".btn").tooltip();
        }, 200);
        Swal.close();
      },
      err => {
        console.log(err);
        subscribeObtener.unsubscribe();
        Swal.fire({
          title: 'Error!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )
  }

  filtrarDatos() {
    // const val = event.target.value.toLowerCase();
    const val1 = this.filtroTexto.nativeElement.value.toLocaleLowerCase().split(' ');

    let temp = this.temp;

    val1.map(element => {

      temp = temp.filter(function (index) {
        return (index.nombre.toLowerCase().indexOf(element) !== -1 ||
          !element);
      });

    });


    // Actualiza las filas
    this.rows = temp;
    // Cuando se realiza un filtro la tabla regresa a la primera pagina
    this.table.offset = 0;

  }

  async eliminarTipoAjuste(tipo_ajuste){
    const id_tipo_ajuste = tipo_ajuste.id;
    console.log(id_tipo_ajuste);
    

    const darDeBaja = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar?',
      // text: '',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });
  
    console.log(darDeBaja);

    if (darDeBaja.dismiss) {
      return;
    }

    Swal.fire({
      title: 'Procesando...',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });


    const subscribeEliminar = this.servicioTiposAjustes.eliminarTipoAjuste(id_tipo_ajuste).subscribe(
      async (res) => {
        const result:any = res;
        console.log(result);
        await Swal.fire({
          icon: 'success',
          title: result.message,
          showCloseButton: true,
          showCancelButton: false,
          confirmButtonText: 'Entendido',
        });
        this.obtenerTiposAjustes();
        subscribeEliminar.unsubscribe();
      },
      async (err) => {
        console.log(err);
        
        Swal.fire({
          title: 'Error al eliminar el tipo de ajuste!',
          text: 'Servidor no responde',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        subscribeEliminar.unsubscribe();
      }
    )
    

  }

  

}
