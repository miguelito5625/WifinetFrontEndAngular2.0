import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarClienteInstalacionComponent } from './seleccionar-cliente-instalacion.component';

describe('SeleccionarClienteInstalacionComponent', () => {
  let component: SeleccionarClienteInstalacionComponent;
  let fixture: ComponentFixture<SeleccionarClienteInstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarClienteInstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarClienteInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
