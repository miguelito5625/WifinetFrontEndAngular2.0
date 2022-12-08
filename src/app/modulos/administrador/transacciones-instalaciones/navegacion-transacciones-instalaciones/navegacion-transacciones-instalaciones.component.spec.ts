import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionTransaccionesInstalacionesComponent } from './navegacion-transacciones-instalaciones.component';

describe('NavegacionTransaccionesInstalacionesComponent', () => {
  let component: NavegacionTransaccionesInstalacionesComponent;
  let fixture: ComponentFixture<NavegacionTransaccionesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionTransaccionesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionTransaccionesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
