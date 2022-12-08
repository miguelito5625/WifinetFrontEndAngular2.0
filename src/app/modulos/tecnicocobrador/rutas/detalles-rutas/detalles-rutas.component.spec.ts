import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRutasComponent } from './detalles-rutas.component';

describe('DetallesRutasComponent', () => {
  let component: DetallesRutasComponent;
  let fixture: ComponentFixture<DetallesRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesRutasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
