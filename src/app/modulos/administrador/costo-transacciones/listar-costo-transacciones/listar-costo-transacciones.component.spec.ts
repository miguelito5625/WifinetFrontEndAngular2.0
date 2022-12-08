import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCostoTransaccionesComponent } from './listar-costo-transacciones.component';

describe('ListarCostoTransaccionesComponent', () => {
  let component: ListarCostoTransaccionesComponent;
  let fixture: ComponentFixture<ListarCostoTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCostoTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCostoTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
