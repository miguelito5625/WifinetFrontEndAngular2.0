import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletasDepositoComponent } from './boletas-deposito.component';

describe('BoletasDepositoComponent', () => {
  let component: BoletasDepositoComponent;
  let fixture: ComponentFixture<BoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
