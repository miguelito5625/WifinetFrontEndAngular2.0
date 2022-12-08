import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDireccionClienteInstalacionComponent } from './seleccionar-direccion-cliente-instalacion.component';

describe('SeleccionarDireccionClienteInstalacionComponent', () => {
  let component: SeleccionarDireccionClienteInstalacionComponent;
  let fixture: ComponentFixture<SeleccionarDireccionClienteInstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarDireccionClienteInstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarDireccionClienteInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
