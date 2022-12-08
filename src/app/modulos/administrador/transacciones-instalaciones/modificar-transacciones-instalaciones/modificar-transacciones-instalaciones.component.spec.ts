import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTransaccionesInstalacionesComponent } from './modificar-transacciones-instalaciones.component';

describe('ModificarTransaccionesInstalacionesComponent', () => {
  let component: ModificarTransaccionesInstalacionesComponent;
  let fixture: ComponentFixture<ModificarTransaccionesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTransaccionesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTransaccionesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
