import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCobrosComponent } from './modificar-cobros.component';

describe('ModificarCobrosComponent', () => {
  let component: ModificarCobrosComponent;
  let fixture: ComponentFixture<ModificarCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
