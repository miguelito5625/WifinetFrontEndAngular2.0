import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRutasComponent } from './listar-rutas.component';

describe('ListarRutasComponent', () => {
  let component: ListarRutasComponent;
  let fixture: ComponentFixture<ListarRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
