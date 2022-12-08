import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarClienteCobroComponent } from './seleccionar-cliente-cobro.component';

describe('SeleccionarClienteCobroComponent', () => {
  let component: SeleccionarClienteCobroComponent;
  let fixture: ComponentFixture<SeleccionarClienteCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarClienteCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarClienteCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
