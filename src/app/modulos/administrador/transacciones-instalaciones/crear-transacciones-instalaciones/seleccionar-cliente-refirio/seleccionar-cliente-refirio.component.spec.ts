import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarClienteRefirioComponent } from './seleccionar-cliente-refirio.component';

describe('SeleccionarClienteRefirioComponent', () => {
  let component: SeleccionarClienteRefirioComponent;
  let fixture: ComponentFixture<SeleccionarClienteRefirioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarClienteRefirioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarClienteRefirioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
