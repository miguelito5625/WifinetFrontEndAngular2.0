import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionUsuariosComponent } from './navegacion-usuarios.component';

describe('NavegacionUsuariosComponent', () => {
  let component: NavegacionUsuariosComponent;
  let fixture: ComponentFixture<NavegacionUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
