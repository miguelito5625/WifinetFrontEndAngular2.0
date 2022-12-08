import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCobrosComponent } from './listar-cobros.component';

describe('ListarCobrosComponent', () => {
  let component: ListarCobrosComponent;
  let fixture: ComponentFixture<ListarCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
