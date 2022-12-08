import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionTiposAjustesComponent } from './navegacion-tipos-ajustes.component';

describe('NavegacionTiposAjustesComponent', () => {
  let component: NavegacionTiposAjustesComponent;
  let fixture: ComponentFixture<NavegacionTiposAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionTiposAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionTiposAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
