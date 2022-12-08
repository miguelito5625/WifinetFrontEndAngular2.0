import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBarriosComponent } from './crear-barrios.component';

describe('CrearBarriosComponent', () => {
  let component: CrearBarriosComponent;
  let fixture: ComponentFixture<CrearBarriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearBarriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
