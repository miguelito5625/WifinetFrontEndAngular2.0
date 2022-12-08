import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTransaccionesInstalacionesComponent } from './listar-transacciones-instalaciones.component';

describe('ListarTransaccionesInstalacionesComponent', () => {
  let component: ListarTransaccionesInstalacionesComponent;
  let fixture: ComponentFixture<ListarTransaccionesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTransaccionesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTransaccionesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
