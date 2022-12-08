import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAjustesBoletasDepositoComponent } from './detalle-ajustes-boletas-deposito.component';

describe('DetalleAjustesBoletasDepositoComponent', () => {
  let component: DetalleAjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<DetalleAjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
