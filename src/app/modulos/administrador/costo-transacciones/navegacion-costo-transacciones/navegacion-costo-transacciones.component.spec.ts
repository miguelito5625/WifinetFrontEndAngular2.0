import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionCostoTransaccionesComponent } from './navegacion-costo-transacciones.component';

describe('NavegacionCostoTransaccionesComponent', () => {
  let component: NavegacionCostoTransaccionesComponent;
  let fixture: ComponentFixture<NavegacionCostoTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionCostoTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionCostoTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
