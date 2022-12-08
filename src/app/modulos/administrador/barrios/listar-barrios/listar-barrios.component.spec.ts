import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBarriosComponent } from './listar-barrios.component';

describe('ListarBarriosComponent', () => {
  let component: ListarBarriosComponent;
  let fixture: ComponentFixture<ListarBarriosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBarriosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
