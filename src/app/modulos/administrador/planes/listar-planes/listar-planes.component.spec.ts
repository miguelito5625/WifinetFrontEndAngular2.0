import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanesComponent } from './listar-planes.component';

describe('ListarPlanesComponent', () => {
  let component: ListarPlanesComponent;
  let fixture: ComponentFixture<ListarPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
