import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioEmpleadoComponent } from './crear-usuario-empleado.component';

describe('CrearUsuarioEmpleadoComponent', () => {
  let component: CrearUsuarioEmpleadoComponent;
  let fixture: ComponentFixture<CrearUsuarioEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsuarioEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
