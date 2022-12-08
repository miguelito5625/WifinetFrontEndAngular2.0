import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCobrosComponent } from './detalles-cobros.component';

describe('DetallesCobrosComponent', () => {
  let component: DetallesCobrosComponent;
  let fixture: ComponentFixture<DetallesCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
