import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesInstalacionesComponent } from './transacciones-instalaciones.component';

describe('TransaccionesInstalacionesComponent', () => {
  let component: TransaccionesInstalacionesComponent;
  let fixture: ComponentFixture<TransaccionesInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
