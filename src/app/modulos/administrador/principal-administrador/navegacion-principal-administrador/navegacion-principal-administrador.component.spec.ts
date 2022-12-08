import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionPrincipalAdministradorComponent } from './navegacion-principal-administrador.component';

describe('NavegacionPrincipalAdministradorComponent', () => {
  let component: NavegacionPrincipalAdministradorComponent;
  let fixture: ComponentFixture<NavegacionPrincipalAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionPrincipalAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionPrincipalAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
