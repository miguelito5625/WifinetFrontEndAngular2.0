import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesVentaComponent } from './detalles-venta.component';

describe('DetallesVentaComponent', () => {
  let component: DetallesVentaComponent;
  let fixture: ComponentFixture<DetallesVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
