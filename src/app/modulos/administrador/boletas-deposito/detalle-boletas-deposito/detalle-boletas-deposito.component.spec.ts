import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBoletasDepositoComponent } from './detalle-boletas-deposito.component';

describe('DetalleBoletasDepositoComponent', () => {
  let component: DetalleBoletasDepositoComponent;
  let fixture: ComponentFixture<DetalleBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
