import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionBarriosComponent } from './navegacion-barrios.component';

describe('NavegacionBarriosComponent', () => {
  let component: NavegacionBarriosComponent;
  let fixture: ComponentFixture<NavegacionBarriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionBarriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
