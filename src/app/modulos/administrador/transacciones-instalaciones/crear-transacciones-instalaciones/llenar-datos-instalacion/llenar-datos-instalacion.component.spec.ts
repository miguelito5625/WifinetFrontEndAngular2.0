import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenarDatosInstalacionComponent } from './llenar-datos-instalacion.component';

describe('LlenarDatosInstalacionComponent', () => {
  let component: LlenarDatosInstalacionComponent;
  let fixture: ComponentFixture<LlenarDatosInstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenarDatosInstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenarDatosInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
