import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlenarDatosCobroComponent } from './llenar-datos-cobro.component';

describe('LlenarDatosCobroComponent', () => {
  let component: LlenarDatosCobroComponent;
  let fixture: ComponentFixture<LlenarDatosCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlenarDatosCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlenarDatosCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
