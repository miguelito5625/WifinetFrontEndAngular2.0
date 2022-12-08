import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoTransaccionesComponent } from './costo-transacciones.component';

describe('CostoTransaccionesComponent', () => {
  let component: CostoTransaccionesComponent;
  let fixture: ComponentFixture<CostoTransaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoTransaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
