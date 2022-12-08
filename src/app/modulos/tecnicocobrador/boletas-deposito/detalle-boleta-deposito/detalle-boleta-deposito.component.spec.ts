import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBoletaDepositoComponent } from './detalle-boleta-deposito.component';

describe('DetalleBoletaDepositoComponent', () => {
  let component: DetalleBoletaDepositoComponent;
  let fixture: ComponentFixture<DetalleBoletaDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBoletaDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBoletaDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
