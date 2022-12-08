import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPlanComponent } from './modificar-plan.component';

describe('ModificarPlanComponent', () => {
  let component: ModificarPlanComponent;
  let fixture: ComponentFixture<ModificarPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
