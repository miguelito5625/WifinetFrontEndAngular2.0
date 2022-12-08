import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAjustesBoletasDepositoComponent } from './crear-ajustes-boletas-deposito.component';

describe('CrearAjustesBoletasDepositoComponent', () => {
  let component: CrearAjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<CrearAjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
