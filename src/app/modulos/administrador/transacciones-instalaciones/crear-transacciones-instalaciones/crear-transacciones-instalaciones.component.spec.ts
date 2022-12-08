import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTransaccionesInstalacionesComponent } from './crear-transacciones-instalaciones.component';

describe('CrearTransaccionesInstalacionesComponent', () => {
  let component: CrearTransaccionesInstalacionesComponent;
  let fixture: ComponentFixture<CrearTransaccionesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTransaccionesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTransaccionesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
