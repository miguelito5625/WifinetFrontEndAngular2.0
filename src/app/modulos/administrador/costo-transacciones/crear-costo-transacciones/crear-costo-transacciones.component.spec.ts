import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCostoTransaccionesComponent } from './crear-costo-transacciones.component';

describe('CrearCostoTransaccionesComponent', () => {
  let component: CrearCostoTransaccionesComponent;
  let fixture: ComponentFixture<CrearCostoTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCostoTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCostoTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
