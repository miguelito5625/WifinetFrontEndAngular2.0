import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTransaccionesComponent } from './detalles-transacciones.component';

describe('DetallesTransaccionesComponent', () => {
  let component: DetallesTransaccionesComponent;
  let fixture: ComponentFixture<DetallesTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
