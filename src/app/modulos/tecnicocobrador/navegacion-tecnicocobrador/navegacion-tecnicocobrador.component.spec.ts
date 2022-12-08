import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionTecnicocobradorComponent } from './navegacion-tecnicocobrador.component';

describe('NavegacionTecnicocobradorComponent', () => {
  let component: NavegacionTecnicocobradorComponent;
  let fixture: ComponentFixture<NavegacionTecnicocobradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionTecnicocobradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionTecnicocobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
