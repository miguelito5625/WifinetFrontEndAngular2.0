import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposAjustesComponent } from './listar-tipos-ajustes.component';

describe('ListarTiposAjustesComponent', () => {
  let component: ListarTiposAjustesComponent;
  let fixture: ComponentFixture<ListarTiposAjustesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTiposAjustesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTiposAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
