import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarBarriosComponent } from './modificar-barrios.component';

describe('ModificarBarriosComponent', () => {
  let component: ModificarBarriosComponent;
  let fixture: ComponentFixture<ModificarBarriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarBarriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
