import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionClientesMorososComponent } from './navegacion-clientes-morosos.component';

describe('NavegacionClientesMorososComponent', () => {
  let component: NavegacionClientesMorososComponent;
  let fixture: ComponentFixture<NavegacionClientesMorososComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionClientesMorososComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionClientesMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
