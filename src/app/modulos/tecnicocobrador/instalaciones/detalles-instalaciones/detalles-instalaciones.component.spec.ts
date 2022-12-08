import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesInstalacionesComponent } from './detalles-instalaciones.component';

describe('DetallesInstalacionesComponent', () => {
  let component: DetallesInstalacionesComponent;
  let fixture: ComponentFixture<DetallesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
