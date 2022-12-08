import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionAjustesBoletasDepositoComponent } from './navegacion-ajustes-boletas-deposito.component';

describe('NavegacionAjustesBoletasDepositoComponent', () => {
  let component: NavegacionAjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<NavegacionAjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionAjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionAjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
