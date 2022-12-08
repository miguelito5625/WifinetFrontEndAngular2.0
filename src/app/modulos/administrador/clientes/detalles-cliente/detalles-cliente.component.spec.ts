import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesClienteComponent } from './detalles-cliente.component';

describe('DetallesClienteComponent', () => {
  let component: DetallesClienteComponent;
  let fixture: ComponentFixture<DetallesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
