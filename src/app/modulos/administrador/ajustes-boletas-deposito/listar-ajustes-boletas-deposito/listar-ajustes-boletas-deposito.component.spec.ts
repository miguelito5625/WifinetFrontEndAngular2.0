import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAjustesBoletasDepositoComponent } from './listar-ajustes-boletas-deposito.component';

describe('ListarAjustesBoletasDepositoComponent', () => {
  let component: ListarAjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<ListarAjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
