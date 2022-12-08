import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInstalacionesRutasComponent } from './agregar-instalaciones-rutas.component';

describe('AgregarInstalacionesRutasComponent', () => {
  let component: AgregarInstalacionesRutasComponent;
  let fixture: ComponentFixture<AgregarInstalacionesRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarInstalacionesRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInstalacionesRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
