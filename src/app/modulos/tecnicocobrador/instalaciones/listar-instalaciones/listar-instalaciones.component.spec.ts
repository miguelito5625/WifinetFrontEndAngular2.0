import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInstalacionesComponent } from './listar-instalaciones.component';

describe('ListarInstalacionesComponent', () => {
  let component: ListarInstalacionesComponent;
  let fixture: ComponentFixture<ListarInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
