import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTransaccionesComponent } from './listar-transacciones.component';

describe('ListarTransaccionesComponent', () => {
  let component: ListarTransaccionesComponent;
  let fixture: ComponentFixture<ListarTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
