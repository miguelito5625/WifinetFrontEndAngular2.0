import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionCobrosComponent } from './navegacion-cobros.component';

describe('NavegacionCobrosComponent', () => {
  let component: NavegacionCobrosComponent;
  let fixture: ComponentFixture<NavegacionCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
