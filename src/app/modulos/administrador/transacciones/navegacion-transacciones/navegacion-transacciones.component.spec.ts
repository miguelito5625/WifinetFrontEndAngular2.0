import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionTransaccionesComponent } from './navegacion-transacciones.component';

describe('NavegacionTransaccionesComponent', () => {
  let component: NavegacionTransaccionesComponent;
  let fixture: ComponentFixture<NavegacionTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
