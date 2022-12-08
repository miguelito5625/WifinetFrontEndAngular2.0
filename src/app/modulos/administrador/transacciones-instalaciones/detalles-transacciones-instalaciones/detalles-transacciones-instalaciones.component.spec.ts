import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTransaccionesInstalacionesComponent } from './detalles-transacciones-instalaciones.component';

describe('DetallesTransaccionesInstalacionesComponent', () => {
  let component: DetallesTransaccionesInstalacionesComponent;
  let fixture: ComponentFixture<DetallesTransaccionesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesTransaccionesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTransaccionesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
