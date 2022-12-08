import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionVentasComponent } from './navegacion-ventas.component';

describe('NavegacionVentasComponent', () => {
  let component: NavegacionVentasComponent;
  let fixture: ComponentFixture<NavegacionVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
