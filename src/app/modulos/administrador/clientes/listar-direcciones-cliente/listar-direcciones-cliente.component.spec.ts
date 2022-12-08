import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDireccionesClienteComponent } from './listar-direcciones-cliente.component';

describe('ListarDireccionesClienteComponent', () => {
  let component: ListarDireccionesClienteComponent;
  let fixture: ComponentFixture<ListarDireccionesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDireccionesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDireccionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
