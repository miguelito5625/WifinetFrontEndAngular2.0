import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInstalacionesComponent } from './crear-instalaciones.component';

describe('CrearInstalacionesComponent', () => {
  let component: CrearInstalacionesComponent;
  let fixture: ComponentFixture<CrearInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
