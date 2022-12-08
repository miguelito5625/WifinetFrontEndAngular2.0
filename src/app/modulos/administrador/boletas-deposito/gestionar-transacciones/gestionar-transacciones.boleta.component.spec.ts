import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTransaccionesBoletaComponent } from './gestionar-transacciones-boleta.component';

describe('GestionarTransaccionesBoletaComponent', () => {
  let component: GestionarTransaccionesBoletaComponent;
  let fixture: ComponentFixture<GestionarTransaccionesBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarTransaccionesBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTransaccionesBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
