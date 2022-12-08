import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionClientesComponent } from './navegacion-clientes.component';

describe('NavegacionClientesComponent', () => {
  let component: NavegacionClientesComponent;
  let fixture: ComponentFixture<NavegacionClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
