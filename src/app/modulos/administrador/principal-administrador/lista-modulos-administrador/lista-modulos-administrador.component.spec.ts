import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModulosAdministradorComponent } from './lista-modulos-administrador.component';

describe('ListaModulosAdministradorComponent', () => {
  let component: ListaModulosAdministradorComponent;
  let fixture: ComponentFixture<ListaModulosAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaModulosAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaModulosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
