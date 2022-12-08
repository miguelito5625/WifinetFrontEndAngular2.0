import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTiposAjustesComponent } from './modificar-tipos-ajustes.component';

describe('ModificarTiposAjustesComponent', () => {
  let component: ModificarTiposAjustesComponent;
  let fixture: ComponentFixture<ModificarTiposAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTiposAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTiposAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
