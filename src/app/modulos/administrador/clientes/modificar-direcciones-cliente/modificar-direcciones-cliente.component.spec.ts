import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDireccionesClienteComponent } from './modificar-direcciones-cliente.component';

describe('ModificarDireccionesClienteComponent', () => {
  let component: ModificarDireccionesClienteComponent;
  let fixture: ComponentFixture<ModificarDireccionesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDireccionesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDireccionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
