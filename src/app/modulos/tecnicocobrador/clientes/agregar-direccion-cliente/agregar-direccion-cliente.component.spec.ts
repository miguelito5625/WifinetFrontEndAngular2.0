import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDireccionClienteComponent } from './agregar-direccion-cliente.component';

describe('AgregarDireccionClienteComponent', () => {
  let component: AgregarDireccionClienteComponent;
  let fixture: ComponentFixture<AgregarDireccionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDireccionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDireccionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
