import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAjustesBoletasDepositoComponent } from './modificar-ajustes-boletas-deposito.component';

describe('ModificarAjustesBoletasDepositoComponent', () => {
  let component: ModificarAjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<ModificarAjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
