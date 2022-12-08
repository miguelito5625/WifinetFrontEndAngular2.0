import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCostoTransaccionesComponent } from './detalles-costo-transacciones.component';

describe('DetallesCostoTransaccionesComponent', () => {
  let component: DetallesCostoTransaccionesComponent;
  let fixture: ComponentFixture<DetallesCostoTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesCostoTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCostoTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
