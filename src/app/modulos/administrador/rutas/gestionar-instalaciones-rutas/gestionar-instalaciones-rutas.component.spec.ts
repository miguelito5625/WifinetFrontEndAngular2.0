import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarInstalacionesRutasComponent } from './gestionar-instalaciones-rutas.component';

describe('GestionarInstalacionesRutasComponent', () => {
  let component: GestionarInstalacionesRutasComponent;
  let fixture: ComponentFixture<GestionarInstalacionesRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarInstalacionesRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarInstalacionesRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
