import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarInstalacionCobroComponent } from './seleccionar-instalacion-cobro.component';

describe('SeleccionarInstalacionCobroComponent', () => {
  let component: SeleccionarInstalacionCobroComponent;
  let fixture: ComponentFixture<SeleccionarInstalacionCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarInstalacionCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarInstalacionCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
