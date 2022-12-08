import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarClientesMorososComponent } from './listar-clientes-morosos.component';

describe('ListarClientesMorososComponent', () => {
  let component: ListarClientesMorososComponent;
  let fixture: ComponentFixture<ListarClientesMorososComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarClientesMorososComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarClientesMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
