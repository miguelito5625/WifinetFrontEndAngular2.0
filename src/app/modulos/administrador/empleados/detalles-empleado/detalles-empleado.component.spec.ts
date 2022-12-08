import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEmpleadoComponent } from './detalles-empleado.component';

describe('DetallesEmpleadoComponent', () => {
  let component: DetallesEmpleadoComponent;
  let fixture: ComponentFixture<DetallesEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
