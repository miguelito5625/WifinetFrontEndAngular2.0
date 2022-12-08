import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosAjustesBoletasDepositoComponent } from './todos-ajustes-boletas-deposito.component';

describe('TodosAjustesBoletasDepositoComponent', () => {
  let component: TodosAjustesBoletasDepositoComponent;
  let fixture: ComponentFixture<TodosAjustesBoletasDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosAjustesBoletasDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosAjustesBoletasDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
