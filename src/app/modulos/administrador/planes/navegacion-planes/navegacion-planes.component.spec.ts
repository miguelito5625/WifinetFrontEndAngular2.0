import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionPlanesComponent } from './navegacion-planes.component';

describe('NavegacionPlanesComponent', () => {
  let component: NavegacionPlanesComponent;
  let fixture: ComponentFixture<NavegacionPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
