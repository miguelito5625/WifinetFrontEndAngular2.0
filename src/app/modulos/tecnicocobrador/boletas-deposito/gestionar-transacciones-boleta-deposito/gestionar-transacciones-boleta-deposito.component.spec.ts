import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTransaccionesBoletaDepositoComponent } from './gestionar-transacciones-boleta-deposito.component';

describe('GestionarTransaccionesBoletaDepositoComponent', () => {
  let component: GestionarTransaccionesBoletaDepositoComponent;
  let fixture: ComponentFixture<GestionarTransaccionesBoletaDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarTransaccionesBoletaDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTransaccionesBoletaDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
