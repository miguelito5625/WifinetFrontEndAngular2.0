import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionRutasComponent } from './navegacion-rutas.component';

describe('NavegacionRutasComponent', () => {
  let component: NavegacionRutasComponent;
  let fixture: ComponentFixture<NavegacionRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
