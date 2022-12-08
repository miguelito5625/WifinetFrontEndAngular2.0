import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarInstalacionesRutasComponent } from './quitar-instalaciones-rutas.component';

describe('QuitarInstalacionesRutasComponent', () => {
  let component: QuitarInstalacionesRutasComponent;
  let fixture: ComponentFixture<QuitarInstalacionesRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitarInstalacionesRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarInstalacionesRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
