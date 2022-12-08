import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionEmpleadosComponent } from './navegacion-empleados.component';

describe('NavegacionEmpleadosComponent', () => {
  let component: NavegacionEmpleadosComponent;
  let fixture: ComponentFixture<NavegacionEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
