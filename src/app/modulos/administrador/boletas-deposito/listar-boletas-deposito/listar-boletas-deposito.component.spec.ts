import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBoletasDepositoComponent } from './listar-boletas-deposito.component';

describe('ListarBoletasDepositoComponent', () => {
  let component: ListarBoletasDepositoComponent;
  let fixture: ComponentFixture<ListarBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
