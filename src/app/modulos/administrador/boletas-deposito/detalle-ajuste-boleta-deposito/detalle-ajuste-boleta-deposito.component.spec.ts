import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAjusteBoletaDepositoComponent } from './detalle-ajuste-boleta-deposito.component';

describe('DetalleAjusteBoletaDepositoComponent', () => {
  let component: DetalleAjusteBoletaDepositoComponent;
  let fixture: ComponentFixture<DetalleAjusteBoletaDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAjusteBoletaDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAjusteBoletaDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
