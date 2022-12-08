import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesBoletasDepositoComponent } from './ajustes-boletas-deposito.component';

describe('AjustesBoletasDepositoComponent', () => {
  let component: AjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<AjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
