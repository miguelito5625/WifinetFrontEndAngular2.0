import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionBoletasDepositoComponent } from './navegacion-boletas-deposito.component';

describe('NavegacionBoletasDepositoComponent', () => {
  let component: NavegacionBoletasDepositoComponent;
  let fixture: ComponentFixture<NavegacionBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
