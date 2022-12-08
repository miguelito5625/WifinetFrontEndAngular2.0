import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioEmpleadoComponent } from './modificar-usuario-empleado.component';

describe('ModificarUsuarioEmpleadoComponent', () => {
  let component: ModificarUsuarioEmpleadoComponent;
  let fixture: ComponentFixture<ModificarUsuarioEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUsuarioEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuarioEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
