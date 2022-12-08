import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarBoletasDepositoComponent } from './modificar-boletas-deposito.component';

describe('ModificarBoletasDepositoComponent', () => {
  let component: ModificarBoletasDepositoComponent;
  let fixture: ComponentFixture<ModificarBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
