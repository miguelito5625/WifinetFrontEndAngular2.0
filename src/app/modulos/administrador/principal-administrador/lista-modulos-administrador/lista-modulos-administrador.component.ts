import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lista-modulos-administrador',
  templateUrl: './lista-modulos-administrador.component.html',
  styleUrls: ['./lista-modulos-administrador.component.css']
})
export class ListaModulosAdministradorComponent implements OnInit, AfterViewInit {
  @ViewChild('moduloClientes') moduloClientes: ElementRef;


  constructor() { }

  ngOnInit(): void {


  }


  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.moduloClientes.nativeElement.classList.remove('animate__animated', 'animate__slideInRight');
    //   this.moduloClientes.nativeElement.classList.add('animate__animated', 'animate__bounceOutLeft');
    // }, 2000);

    // this.moduloClientes.nativeElement
    //   .addEventListener('animationend', () => {
    //     console.log('termino');

    //     this.moduloClientes.nativeElement.classList.remove('animate__animated', 'animate__bounceInRight');
    //     // this.moduloClientes.nativeElement.classList.add('animate__animated', 'animate__hinge');

    //     setTimeout(() => {
    //       this.moduloClientes.nativeElement.classList.add('animate__animated', 'animate__hinge');
    //     }, 500);

    //   });
  }

}
