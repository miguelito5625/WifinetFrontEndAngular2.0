import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTiposAjustesComponent } from './crear-tipos-ajustes.component';

describe('CrearTiposAjustesComponent', () => {
  let component: CrearTiposAjustesComponent;
  let fixture: ComponentFixture<CrearTiposAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTiposAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTiposAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
